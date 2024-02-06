import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/users/CreateUser.dto";
import { UsersService } from "./users.service";
import { LoginUserDto } from "src/dtos/users/LoginUserDto.dto";
import { AuthGuard } from "src/auth/auth.middleware";



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    @UseGuards(AuthGuard)
    @Post('sign-up')
    async createNewUser(@Req() request: Request, @Body() userData: CreateUserDto) {
        try {
            return await this.usersService.createNewUser(userData, request['user']);
        } catch (e) {
            return e
        }
    }
}