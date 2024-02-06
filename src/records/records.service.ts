import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { hash, compare } from 'bcryptjs';
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/users/CreateUser.dto";
import { ResponseUser } from "src/dtos/users/ResponseUser.dto";
import { LoginUserDto } from "src/dtos/users/LoginUserDto.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateLessonDto } from "src/dtos/lessons/CreateLessonDto.dto";
import { ResponseLessonsDto } from "src/dtos/lessons/ResponseLessonsDto.dto";
import { LessonsService } from "src/lessons/lessons.service";
import { CreateRecordDto } from "src/dtos/records/CreateRecordDto.dto";
import { PayloadDto } from "src/dtos/auth/PayloadDto.dto";
import { UsersService } from "src/users/users.service";
import { Lessons } from "src/lessons/lessons.entity";
import { Records } from "./records.entity";
import { Role } from "src/roles/roles.enum";
import { RecordsResponseDto } from "src/dtos/records/RecordsResponseDto.dto";



@Injectable()
export class RecordsService {
    constructor(
        @InjectRepository(Records)
        private recordsRepository: Repository<Records>,
        private lessonsService: LessonsService,
        private usersService: UsersService
    ) {};

    async createRecord(recordData: CreateRecordDto, userData: PayloadDto) {
        const lesson = await this.lessonsService.getLessonById(recordData.lessonId);
        const user = await this.usersService.getUserById(userData.public_userId);

        const record = this.recordsRepository.create({user: user, lesson: lesson});
        await this.recordsRepository.save(record);

        return new RecordsResponseDto({id: record.id, isActive: record.isActive, user: {id: record.user.id}, lesson: {id: record.id}})
    }

    async getRecordsByUserId(userData: PayloadDto) {
        const user = await this.usersService.getUserById(userData.public_userId);
        
        const records = await this.recordsRepository.find({where: {
            user: user
        },
        relations: {
            user: true,
            lesson: true
        }});

        return records.map((record) => {
            return new RecordsResponseDto({id: record.id, isActive: record.isActive, user: {id: record.user.id}, lesson: {id: record.id}})
        });
    }

    async getAllRecords(userData: PayloadDto) {
        const user = await this.usersService.getUserById(userData.public_userId);

        if (user.role === Role.Client) {
            throw new HttpException('permission denied', HttpStatus.FORBIDDEN);
        }

        const records = await this.recordsRepository.find({relations: {
            user: true,
            lesson: true
        }});
        
        return records.map((record) => {
            return new RecordsResponseDto({id: record.id, isActive: record.isActive, user: {id: record.user.id}, lesson: {id: record.id}})
        });
    }
}