import { Role } from "src/roles/roles.enum";

export class ResponseAuthDto {
    userEmail: string;
    accessToken: string;
    userRole: Role

    constructor (model: {userEmail: string, accessToken: string, userRole: Role}) {
        this.userEmail = model.userEmail;
        this.accessToken = model.accessToken;
        this.userRole = model.userRole;
    }
}