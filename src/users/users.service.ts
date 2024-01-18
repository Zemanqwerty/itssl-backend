import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { hash, compare } from 'bcryptjs';
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/users/CreateUser.dto";
import { ResponseUser } from "src/dtos/users/ResponseUser.dto";
import { LoginUserDto } from "src/dtos/users/LoginUserDto.dto";



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {};

    async createNewUser(userData: CreateUserDto) {
        const condidate = await this.getUserByEmail(userData.email);
        if (condidate) {
            throw new HttpException('Пользователь с такой почтой уже зарегистрирован', HttpStatus.BAD_REQUEST);
        }

        userData.password = await hash(userData.password, 3);

        const newUser = this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);

        return new ResponseUser({childrenFIO: newUser.childrenFIO, email: newUser.email});
    }

    async login(userData: LoginUserDto) {

    }

    async getUserByEmail(email: string) {
        const user = await this.usersRepository.findOne({where: {
            email: email,
        }})

        return user;
    }
}