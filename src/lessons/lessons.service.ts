import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { hash, compare } from 'bcryptjs';
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/users/CreateUser.dto";
import { ResponseUser } from "src/dtos/users/ResponseUser.dto";
import { LoginUserDto } from "src/dtos/users/LoginUserDto.dto";
import { Lessons } from "./lessons.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateLessonDto } from "src/dtos/lessons/CreateLessonDto.dto";
import { ResponseLessonsDto } from "src/dtos/lessons/ResponseLessonsDto.dto";



@Injectable()
export class LessonsService {
    constructor(
        @InjectRepository(Lessons)
        private lessonsRepository: Repository<Lessons>,
    ) {};

    async createLesson(lessonData: CreateLessonDto) {
        const lesson = this.lessonsRepository.create(lessonData);
        await this.lessonsRepository.save(lesson);

        return new ResponseLessonsDto({title: lesson.title, dateTime: lesson.dateTime});
    }

    async getLessons() {
        const lessonsList = await this.lessonsRepository.find()
        
        return lessonsList;
    }

    async getLessonById(lessonId: number) {
        return await this.lessonsRepository.findOneBy({id: lessonId});
    }
}