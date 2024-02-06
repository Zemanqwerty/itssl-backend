import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "src/dtos/lessons/CreateLessonDto.dto";
import { AuthGuard } from "src/auth/auth.middleware";

@Controller('lessons')
export class LessonsController {
    constructor(private readonly lessonsService: LessonsService) {};

    @UseGuards(AuthGuard)
    @Post('create')
    async createNewUser(@Req() request: Request, @Body() lessonData: CreateLessonDto) {
        try {
            console.log('---');
            console.log(request['user']);
            console.log('---');
            return await this.lessonsService.createLesson(lessonData, request['user'])
        } catch (e) {
            console.log(e);
            return e
        }
    }

    @Get('all')
    async getAllLessons() {
        try {
            return await this.lessonsService.getLessons();
        } catch (e) {
            return e
        }
    }

    @Get('next')
    async getAllNextLessons() {
        try {
            return await this.lessonsService.getNextLessons();
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}