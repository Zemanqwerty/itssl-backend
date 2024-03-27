import { UsersCourse } from "src/users-course/users-course.entity";

export class ResponseClients {
    id: number;
    childrenFIO: string;
    parrentFIO: string | null;
    age: number;
    contractNumber: string;
    conclusionDate: string;
    phoneNumber: string;
    email: string;
    usersCourse: string[];

    constructor (model: {id: number,
                        childrenFIO: string,
                        parrentFIO: string | null,
                        age: number,
                        contractNumber: string,
                        conclusionDate: string,
                        phoneNumber: string,
                        email: string,
                        usersCourse: UsersCourse[]})
    {
        this.id = model.id;
        this.childrenFIO = model.childrenFIO;
        this.parrentFIO = model.parrentFIO;
        this.age = model.age;
        this.contractNumber = model.contractNumber;
        this.conclusionDate = model.conclusionDate;
        this.phoneNumber = model.phoneNumber;
        this.email = model.email;
        this.usersCourse = model.usersCourse.map((course) => {return course.courseTitle});
    }
}