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
import { UsersService } from "src/users/users.service";
import { Lessons } from "src/lessons/lessons.entity";
import { Records } from "./records.entity";
import { Role } from "src/roles/roles.enum";
import { RecordsResponseDto } from "src/dtos/records/RecordsResponseDto.dto";
import { Payload } from "src/auth/Payload.dto";



@Injectable()
export class RecordsService {
    constructor(
        @InjectRepository(Records)
        private recordsRepository: Repository<Records>,
        private lessonsService: LessonsService,
        private usersService: UsersService
    ) {};

    async createRecord(recordData: CreateRecordDto, userData: Payload) {
        function areDatesInSameWeek(date1: Date, date2: Date) {
            const oneDay = 24 * 60 * 60 * 1000; // количество миллисекунд в одном дне
          
            // Округляем даты до начала недели
            const startOfWeek1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() - date1.getDay());
            const startOfWeek2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate() - date2.getDay());
          
            // Сравниваем округленные даты
            return Math.floor(startOfWeek1.getTime() / oneDay) === Math.floor(startOfWeek2.getTime() / oneDay);
        }

        function canAddDateToList(dateList: Date[], newDate: Date) {
            // Определяем, сколько дат уже в списке относятся к той же неделе, что и новая дата
            const sameWeekCount = dateList.filter(date => areDatesInSameWeek(date, newDate)).length;
          
            // Если меньше двух дат в этой неделе, то новую дату можно добавить
            return sameWeekCount < 2;
        }

        // const dateList = [new Date('2022-01-01'), new Date('2022-01-02'), new Date('2022-01-08')];
        // const newDate = new Date('2022-01-03');

        // console.log(canAddDateToList(dateList, newDate)); // true

        const lesson = await this.lessonsService.getLessonById(recordData.lessonId);
        const user = await this.usersService.getUserByEmail(userData.publickUserEmail)

        const usersRecords = await this.recordsRepository.find({
            where: {
                user: {
                    id: user.id
                },
                isActive: true,
            },
            relations: {
                user: true,
                lesson: true,
            }
        })

        const dateTimes = usersRecords.map(record => new Date(record.lesson.dateTime));

        if (!canAddDateToList(dateTimes, new Date(lesson.dateTime))) {
            throw new HttpException('Вы не можете записаться более чем на два занятия в неделю. Вы можете отменить другое занятие либо связаться с менеджером для оформления дополнительного занятия (Дополнительное занятие будет стоить 500 рублей)', HttpStatus.BAD_REQUEST);
        }

        const record = this.recordsRepository.create({user: user, lesson: lesson});
        await this.recordsRepository.save(record);

        return new RecordsResponseDto({id: record.id, isActive: record.isActive, user: {id: record.user.id}, lesson: {id: record.lesson.id}})
    }

    async cancleRecordByLessonId(lessonId: number, userData: Payload) {
        const user = await this.usersService.getUserByEmail(userData.publickUserEmail);
        const record = await this.recordsRepository.findOne({
            where: {
                lesson: {
                    id: lessonId
                },
                user: {
                    id: user.id
                },
                isActive: true
            },
            relations: {
                user: true,
                lesson: true
            }
        });
        console.log(record);

        if (user.id !== record.user.id) {
            throw new HttpException('permission denied', HttpStatus.FORBIDDEN);
        }

        record.isActive = false;

        return await this.recordsRepository.save(record);
    }

    async getRecordsByUserId(userData: Payload) {
        console.log(userData.publickUserEmail);
        const user = await this.usersService.getUserByEmail(userData.publickUserEmail);
        console.log(user);
        
        const records = await this.recordsRepository.find({where: {
            user: user,
            isActive: true,
        },
        relations: {
            user: true,
            lesson: true
        }});

        console.log(records);

        // console.log(records);
        return records.map((record) => {
            return new RecordsResponseDto({id: record.id, isActive: record.isActive, user: {id: record.user.id}, lesson: {id: record.lesson.id}})
        });
    }

    async getAllRecords(userData: Payload) {
        const user = await this.usersService.getUserByEmail(userData.publickUserEmail);

        if (user.role === Role.Client) {
            throw new HttpException('permission denied', HttpStatus.FORBIDDEN);
        }

        const records = await this.recordsRepository.find({relations: {
            user: true,
            lesson: true
        }});

        return records;
        
        // return records.map((record) => {
        //     return new RecordsResponseDto({id: record.id, isActive: record.isActive, user: {id: record.user.id}, lesson: {id: record.lesson.id}})
        // });
    }
}