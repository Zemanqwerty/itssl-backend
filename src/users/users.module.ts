import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from 'src/roles/roles.module';
import { UsersCourseModule } from 'src/users-course/users-course.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        RolesModule,
        UsersCourseModule
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}
