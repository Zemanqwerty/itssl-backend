export class LessonsDto {
    type: string;
    title: string;
    isOnline: boolean;
    dateTime: Date;

    constructor (model: {type: string, title: string, isOnline: boolean, dateTime: Date}) {
        this.type = model.type;
        this.title = model.title;
        this.isOnline = model.isOnline;
        this.dateTime = model.dateTime; 
    }
}