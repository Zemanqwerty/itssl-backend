export class ResponseClients {
    id: number;
    childrenFIO: string;
    parrentFIO: string | null;
    age: number;
    contractNumber: string;
    conclusionDate: string;
    phoneNumber: string;
    email: string;
    course: string;

    constructor (model: {id: number,
                        childrenFIO: string,
                        parrentFIO: string | null,
                        age: number,
                        contractNumber: string,
                        conclusionDate: string,
                        phoneNumber: string,
                        email: string,
                        course: string})
    {
        this.id = model.id;
        this.childrenFIO = model.childrenFIO;
        this.parrentFIO = model.parrentFIO;
        this.age = model.age;
        this.contractNumber = model.contractNumber;
        this.conclusionDate = model.conclusionDate;
        this.phoneNumber = model.phoneNumber;
        this.email = model.email;
        this.course = model.course;
    }
}