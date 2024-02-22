import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
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
            console.log(e);
            return e
        }
    }

    @UseGuards(AuthGuard)
    @Get('all')
    async getAllUsers(@Req() request: Request) {
        try {
            return await this.usersService.getAllUsers(request['user']);
        } catch (e) {
            return e
        }
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async changeUserData(@Param() params: any, @Req() request: Request, @Body() userData: CreateUserDto) {
        try {
            console.log(userData);
            return await this.usersService.changeUserData(params.id, userData, request['user']);
        } catch (e) {
            console.log(e);
            return e
        }
    }
}