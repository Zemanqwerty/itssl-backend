export class ResponseLessonsDto {
    title: string;
    dateTime: Date;

    constructor (model: {title: string, dateTime: Date}) {
        this.title = model.title;
        this.dateTime = model.dateTime
    }
}