import { LessonsDto } from "./LessonsDto.dto";

export class AllNextLessonsDto {
    onDate: Date;
    lessonsOnDate: LessonsDto[];

    constructor (model: {onDate: Date, lessonsOnDate: LessonsDto[]}) {
        this.onDate = model.onDate;
        this.lessonsOnDate = model.lessonsOnDate;
    }
}