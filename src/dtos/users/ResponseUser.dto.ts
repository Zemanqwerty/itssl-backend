export class ResponseUser {
    childrenFIO: string;
    email: string;

    constructor(model: {childrenFIO: string, email: string}) {
        this.childrenFIO = model.childrenFIO;
        this.email = model.email;
    }
}