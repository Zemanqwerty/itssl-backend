import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/users/CreateUser.dto";
import { UsersService } from "./users.service";
import { LoginUserDto } from "src/dtos/users/LoginUserDto.dto";



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    @Post('sign-up')
    async createNewUser(@Body() userData: CreateUserDto) {
        try {
            return await this.usersService.createNewUser(userData);
        } catch (e) {
            return e
        }
    }

    @Post('sign-in')
    async login(@Body() userData: LoginUserDto) {

    }
}