import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/users/CreateUser.dto";
import { ResponseUser } from "src/dtos/users/ResponseUser.dto";
import { LoginUserDto } from "src/dtos/users/LoginUserDto.dto";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ResponseAuthDto } from "src/dtos/auth/ResponseAuthDto.dto";
import { PayloadDto } from "src/dtos/auth/PayloadDto.dto";
import * as bcrypt from 'bcrypt';

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

        const passwordsEqual = await bcrypt.compare(userData.password, user.password)

        if (!passwordsEqual) {
            throw new HttpException(`Неправильный пароль`, HttpStatus.BAD_REQUEST)
        }


        const payload = new PayloadDto({public_userId: user.id, public_userEmail: user.email});
        console.log(payload);

        const accessToken = await this.jwtService.signAsync({public_userId: payload.public_userId,
                                                             public_userEmail: payload.public_userEmail});
        console.log('12234');
        return new ResponseAuthDto({userEmail: user.email, accessToken: accessToken});
    }
}