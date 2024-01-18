export class ResponseLessonsDto {
    title: string;
    date: Date;
    time: Date;

    constructor (model: {title: string, date: Date, time: Date}) {
        this.title = model.title;
        this.date = model.date;
        this.time = model.time;
    }
}