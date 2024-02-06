export class ResponseLessonsDto {
    title: string;
    dateTime: Date | string;

    constructor (model: {title: string, dateTime: Date | string}) {
        this.title = model.title;
        this.dateTime = model.dateTime
    }
}