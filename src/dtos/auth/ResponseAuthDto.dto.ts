export class ResponseAuthDto {
    userEmail: string;
    accessToken: string;

    constructor (model: {userEmail: string, accessToken: string}) {
        this.userEmail = model.userEmail;
        this.accessToken = model.accessToken;
    }
}