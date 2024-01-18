import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "src/dtos/lessons/CreateLessonDto.dto";
import { AuthGuard } from "src/auth/auth.middleware";

@Controller('lessons')
export class LessonsController {
    constructor(private readonly lessonsService: LessonsService) {};

    @UseGuards(AuthGuard)
    @Post('create')
    async createNewUser(@Body() lessonData: CreateLessonDto) {
        try {
            return await this.lessonsService.createLesson(lessonData)
        } catch (e) {
            return e
        }
    }

    @UseGuards(AuthGuard)
    @Get('all')
    async getAllLessons() {
        try {
            return await this.lessonsService.getLessons();
        } catch (e) {
            return e
        }
    }
}