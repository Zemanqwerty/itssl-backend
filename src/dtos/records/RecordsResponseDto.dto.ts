export class RecordsResponseDto {
    id: number;
    isActive: boolean;
    user: {
        id: number;
        FIO: string;
    };
    lesson: {
        id: number;
        date: Date;
        isOnline: boolean;
        title: string;
    }

    constructor (model: {id: number, isActive: boolean, user: {id: number, FIO: string}, lesson: {id: number, date: Date, isOnline: boolean, title: string}}) {
        this.id = model.id;
        this.isActive = model.isActive;
        this.user = model.user;
        this.lesson = model.lesson;
    }
}