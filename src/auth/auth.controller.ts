import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { LoginUserDto } from "src/dtos/users/LoginUserDto.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.middleware";



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @Post('sign-in')
    async login(@Body() userData: LoginUserDto) {
        try {
            return await this.authService.login(userData)
        } catch (e) {
            return e
        }
    }
}