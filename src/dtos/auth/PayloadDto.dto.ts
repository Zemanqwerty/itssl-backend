export class PayloadDto {
    public_userId: number;
    public_userEmail: string;

    constructor (model: {public_userId: number, public_userEmail: string}) {
        this.public_userId = model.public_userId;
        this.public_userEmail = model.public_userEmail;
    }
}