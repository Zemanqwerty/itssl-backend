import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { hash, compare } from 'bcryptjs';
import { Repository, MoreThan } from "typeorm";
import { CreateUserDto } from "src/dtos/users/CreateUser.dto";
import { ResponseUser } from "src/dtos/users/ResponseUser.dto";
import { LoginUserDto } from "src/dtos/users/LoginUserDto.dto";
import { Lessons } from "./lessons.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateLessonDto } from "src/dtos/lessons/CreateLessonDto.dto";
import { ResponseLessonsDto } from "src/dtos/lessons/ResponseLessonsDto.dto";
import moment, { localeData } from "moment-timezone";
import { PayloadDto } from "src/dtos/auth/PayloadDto.dto";
import { UsersService } from "src/users/users.service";
import { Role } from "src/roles/roles.enum";
import { AllNextLessonsDto } from "src/dtos/lessons/AllNextLessonsDto.dto";
import { LessonsDto } from "src/dtos/lessons/LessonsDto.dto";
import { Payload } from "src/auth/Payload.dto";



@Injectable()
export class LessonsService {
    constructor(
        @InjectRepository(Lessons)
        private lessonsRepository: Repository<Lessons>,
        private usersService: UsersService
    ) {};

    async createLesson(lessonData: CreateLessonDto, userData: PayloadDto) {
        console.log(lessonData)
        const customer = await this.usersService.getUserById(userData.public_userId);

        if (customer.role === Role.Client) {
            throw new HttpException('permission denied', HttpStatus.FORBIDDEN);
        }

        if (!(lessonData.dateTime instanceof Date)) {
            lessonData.dateTime = new Date(lessonData.dateTime);
        }

        lessonData.dateTime.setUTCHours(lessonData.dateTime.getUTCHours() + 8);
        
        const lesson = this.lessonsRepository.create(lessonData);
        await this.lessonsRepository.save(lesson);

        return new ResponseLessonsDto({title: lesson.title, dateTime: lesson.dateTime});
    }

    async getLessons() {
        const lessonsList = await this.lessonsRepository.find()
        
        return lessonsList;
    }

    async getNextLessons() {
        const currentDate = new Date;

        const nextLessons = await this.lessonsRepository.find({
            where: {
                dateTime: MoreThan(currentDate)
            },
            order: {
                dateTime: 'ASC'
            }
        });

        const groupedLessons = nextLessons.reduce((acc, lesson) => {
            if (lesson.dateTime instanceof Date) {
                const date = lesson.dateTime.toISOString().split('T')[0];
                // const date = lesson.dateTime.toLocaleTimeString('ru-RU', {hour12: false, timeZone: 'UTC'});
                
                if (!acc[date]) {
                    acc[date] = [];
                }
                console.log(lesson.dateTime);
                // lesson.dateTime = `${lesson.dateTime.getHours()}:${lesson.dateTime.getMinutes()}`;
                lesson.dateTime = lesson.dateTime.toLocaleTimeString('ru-RU', {hour12: false, timeZone: 'UTC'}).slice(0, 5);
                console.log(lesson.dateTime);
                acc[date].push(lesson);
                return acc;
            }
        }, {});
          
        const response = Object.entries(groupedLessons).map(([date, lessonsOnDate]) => ({
          onDate: new Date(date),
          lessonsOnDate,
        }));

        console.log(response);
        return response;
    }

    async getLessonById(lessonId: number) {
        return await this.lessonsRepository.findOneBy({id: lessonId});
    }

    async deleteLessonById(id: number, userData: Payload) {
        console.log(id);
        const user = await this.usersService.getUserByEmail(userData.publickUserEmail);

        if (user.role === Role.Client) {
            throw new HttpException('permission denied', HttpStatus.FORBIDDEN);
        }

        const lesson = await this.lessonsRepository.findOne({
            where: {
                id: id
            }
        });

        return await this.lessonsRepository.remove(lesson);
    }
}