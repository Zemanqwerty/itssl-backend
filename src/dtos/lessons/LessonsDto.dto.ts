export class LessonsDto {
    type: string;
    title: string;
    isOnline: boolean;
    dateTime: Date | string;

    constructor (model: {type: string, title: string, isOnline: boolean, dateTime: Date | string}) {
        this.type = model.type;
        this.title = model.title;
        this.isOnline = model.isOnline;
        this.dateTime = model.dateTime; 
    }
}