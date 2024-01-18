import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from 'bcryptjs';
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/users/CreateUser.dto";
import { ResponseUser } from "src/dtos/users/ResponseUser.dto";
import { LoginUserDto } from "src/dtos/users/LoginUserDto.dto";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ResponseAuthDto } from "src/dtos/auth/ResponseAuthDto.dto";



@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) {};

    async login(userData: LoginUserDto) {
        const user = await this.usersService.getUserByEmail(userData.email);

        if (!user) {
            throw new HttpException('Пользователь с такой почтой не найден', HttpStatus.BAD_REQUEST);
        }

        if (!compare(user.password, userData.password)) {
            throw new HttpException(`Неправильный пароль`, HttpStatus.BAD_REQUEST)
        }

        const payload = {
            public_userId: user.id,
            public_userEmail: user.email
        }

        const accessToken = await this.jwtService.signAsync(payload);

        return new ResponseAuthDto({userEmail: user.email, accessToken: accessToken});
    }
}