import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/users/CreateUser.dto";
import { ResponseUser } from "src/dtos/users/ResponseUser.dto";
import { LoginUserDto } from "src/dtos/users/LoginUserDto.dto";
import * as bcrypt from 'bcrypt';
import { Role } from "src/roles/roles.enum";
import { PayloadDto } from "src/dtos/auth/PayloadDto.dto";
import { ResponseClients } from "src/dtos/users/ResponseClient.dto";



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {};

    async createNewUser(userData: CreateUserDto, customerData: PayloadDto) {
        console.log(userData);
        const customer = await this.getUserById(customerData.public_userId);

        if (customer.role === Role.Client) {
            throw new HttpException('permission denied', HttpStatus.FORBIDDEN);
        }

        const condidate = await this.getUserByEmail(userData.email);
        if (condidate) {
            throw new HttpException('Пользователь с такой почтой уже зарегистрирован', HttpStatus.BAD_REQUEST);
        }

        // userData.password = await hash(userData.password, 3);
        userData.password = await bcrypt.hash(userData.password, 10);

        const newUser = this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);

        return new ResponseUser({childrenFIO: newUser.childrenFIO, email: newUser.email});
    }

    async changeUserData(id: number, userData: CreateUserDto, customerData: PayloadDto) {
        const customer = await this.getUserById(customerData.public_userId);

        if (customer.role === Role.Client) {
            throw new HttpException('permission denied', HttpStatus.FORBIDDEN);
        }

        const user = await this.usersRepository.findOne({
            where: {
                id: id
            }
        })

        // userData.password = await hash(userData.password, 3);
        userData.password = await bcrypt.hash(userData.password, 10);

        user.childrenFIO = userData.childrenFIO;
        user.parrentFIO = userData.parrentFIO;
        user.age = userData.age;
        user.contractNumber = userData.contractNumber;
        user.conclusionDate = userData.conclusionDate;
        user.phoneNumber = userData.phoneNumber;
        user.email = userData.email;
        user.password = userData.password;
        user.course = userData.course;

        await this.usersRepository.save(user);

        return new ResponseUser({childrenFIO: user.childrenFIO, email: user.email});
    }

    async getAllUsers(userData: PayloadDto) {
        const user = await this.getUserById(userData.public_userId);

        if (user.role === Role.Client) {
            throw new HttpException('permission denied', HttpStatus.FORBIDDEN);
        }

        const clientsList = await this.usersRepository.find({
            where: {
                role: Role.Client
            }
        });

        return clientsList.map((client) => {
            return new ResponseClients(client);
        })
    }

    async getUserByEmail(email: string) {
        const user = await this.usersRepository.findOne({where: {
            email: email,
        }})

        return user;
    }

    async getUserById(userId: number) {
        return await this.usersRepository.findOneBy({id: userId});
    }

    async onModuleInit() {
        const adminCondidate = await this.usersRepository.findOne({where: {
            role: Role.Admin,
            email: process.env.BASE_ADMIN_EMAIL,
        }})

        if (adminCondidate) {
            return
        }

        const adminHashedPassword = await bcrypt.hash(process.env.BASE_ADMIN_PASSWORD, 10);
        
        const baseAdmin = this.usersRepository.create({
            childrenFIO: 'baseAdmin',
            parrentFIO: null,
            age: 0,
            contractNumber: '',
            conclusionDate: '2024-01-01',
            phoneNumber: '',
            email: process.env.BASE_ADMIN_EMAIL,
            password: adminHashedPassword,
            course: '',
            role: Role.Admin
        });

        await this.usersRepository.save(baseAdmin);
        console.log('BASE ADMIN CREATED');
    }
}