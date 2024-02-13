import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
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
import { TokensService } from "src/tokens/tokens.service";
import { Response } from "express";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        private tokensService: TokensService,
    ) {};

    async login(userData: LoginUserDto, response: Response) {
        const user = await this.usersService.getUserByEmail(userData.email);

        if (!user) {
            throw new HttpException('Пользователь с такой почтой не найден', HttpStatus.BAD_REQUEST);
        }

        const passwordsEqual = await bcrypt.compare(userData.password, user.password)

        if (!passwordsEqual) {
            throw new HttpException(`Неправильный пароль`, HttpStatus.BAD_REQUEST)
        }

        const accessToken = await this.jwtService.signAsync({publickUserEmail: user.email, publickUserRoles: user.role}, {secret: process.env.JWT_ACCESS_SECRET_KEY, expiresIn: '20m'});
        const refreshToken = await this.jwtService.signAsync({publickUserEmail: user.email, publickUserRoles: user.role}, {secret: process.env.JWT_REFRESH_SECRET_KEY, expiresIn: '30d'});

        const savedRefreshToken = await this.tokensService.saveToken(refreshToken, user);
        
        console.log(`THIS REFRESHTOKEN SETTED AFTER LOGIN - ${refreshToken}`);

        response.cookie('refreshToken', refreshToken, {
            // domain: 'localhost',
            httpOnly: true,
            // sameSite: 'none',
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        return new ResponseAuthDto({userEmail: user.email, accessToken: accessToken});
    }

    async refresh(refsreshToken: string | undefined, response: Response) {
        const payload = await this.tokensService.verifyRefreshToken(refsreshToken);

        const user = await this.usersService.getUserByEmail(payload.publickUserEmail)

        const newAccessToken = await this.jwtService.signAsync({publickUserEmail: user.email, publickUserRoles: user.role}, {secret: process.env.JWT_ACCESS_SECRET_KEY, expiresIn: '20m'});
        const NewRefreshToken = await this.jwtService.signAsync({publickUserEmail: user.email, publickUserRoles: user.role}, {secret: process.env.JWT_REFRESH_SECRET_KEY, expiresIn: '30d'});
        
        const savedRefreshToken = await this.tokensService.saveToken(NewRefreshToken, user);

        response.cookie('refreshToken', NewRefreshToken, {
            // domain: 'localhost',
            httpOnly: true,
            // sameSite: 'none',
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        
        return new ResponseAuthDto({userEmail: user.email, accessToken: newAccessToken});
    }

    async logout(refreshToken: string | undefined) {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }

        const removedToken = await this.tokensService.removeToken(refreshToken);

        return removedToken.user;
    }
}