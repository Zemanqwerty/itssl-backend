export class RecordsResponseDto {
    id: number;
    isActive: boolean;
    user: {
        id: number;
    };
    lesson: {
        id: number;
    }

    constructor (model: {id: number, isActive: boolean, user: {id: number}, lesson: {id: number}}) {
        this.id = model.id;
        this.isActive = model.isActive;
        this.user = model.user;
        this.lesson = model.lesson;
    }
}