import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UsersService,
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
      
        JwtModule.register({
          global: true,
          secret: process.env.JWT_ACCESS_SECRET_KEY,
          signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
