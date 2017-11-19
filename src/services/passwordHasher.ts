export class PasswordHasher {
    private salt:string = "N_P12anzz^&@!!";
    private hasher = require('sha512');
    constructor() {

    }

    hash(input: string, salt: string): string {
        return this
            .hasher(`${salt}.${input}.${this.salt}`)
            .toString('hex');
    }
}