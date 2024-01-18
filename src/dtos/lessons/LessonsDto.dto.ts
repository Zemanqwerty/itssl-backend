export class LessonsDto {
    type: string;
    title: string;
    isOnline: boolean;
    date: Date;
    time: Date;

    constructor (model: {type: string, title: string, isOnline: boolean, date: Date, time: Date}) {
        this.type = model.type;
        this.title = model.title;
        this.isOnline = model.isOnline;
        this.date = model.date;
        this.time = model.time;
    }
}