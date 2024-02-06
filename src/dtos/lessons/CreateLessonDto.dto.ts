export class CreateLessonDto {
    type: string;
    title: string;
    isOnline: boolean;
    dateTime: Date | string;
}