export class CreateUserDto {
    childrenFIO: string;
    parrentFIO?: string | null;
    age: number;
    contractNumber: string;
    conclusionDate: string;
    phoneNumber: string;
    email: string;
    password: string;
    courses: string[];
}