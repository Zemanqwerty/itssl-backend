import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateLessonDto } from "src/dtos/lessons/CreateLessonDto.dto";
import { AuthGuard } from "src/auth/auth.middleware";
import { RecordsService } from "./records.service";
import { CreateRecordDto } from "src/dtos/records/CreateRecordDto.dto";
import { Request } from "express";
import { CreateRecordByUser } from "src/dtos/records/CreateRecordByUser.dto";

@Controller('records')
export class RecordsController {
    constructor(private readonly recordsService: RecordsService) {};

    @UseGuards(AuthGuard)
    @Post('create')
    async createNewRecord(@Req() request: Request, @Body() recordData: CreateRecordDto) {
        try {
            return await this.recordsService.createRecord(recordData, request['user']);
        } catch (e) {
            return e
        }
    }

    @UseGuards(AuthGuard)
    @Post('createbyuser')
    async createNewRecordByUser(@Req() request: Request, @Body() recordData: CreateRecordByUser) {
        try {
            return await this.recordsService.createRecordByUser(request['user'], recordData);
        } catch (e) {
            console.log(e);
            return e
        }
    }

    @UseGuards(AuthGuard)
    @Get('all')
    async getAllLessons(@Req() request: Request) {
        try {
            return await this.recordsService.getAllRecords(request['user']);
        } catch (e) {
            console.log(e);
            return e
        }
    }

    @UseGuards(AuthGuard)
    @Get('myrecords')
    async getRecordsById(@Req() request: Request) {
        try {
            console.log(request['user']);
            return await this.recordsService.getRecordsByUserId(request['user'])
        } catch (e) {
            console.log(e);
            return e
        }
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async cancleRecordByLessonId(@Param() params: any, @Req() request: Request) {
        try {
            return await this.recordsService.cancleRecordByLessonId(params.id, request['user']);
        } catch (e) {
            return e
        }
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteOrderForAdmin(@Param() params: any, @Req() request: Request) {
        try {
            return await this.recordsService.deleteRecordForAdmin(params.id, request['user']);
        } catch (e) {
            return e
        }
    }
}