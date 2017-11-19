import { PasswordHasher } from '../services/passwordHasher';
import { IdentityDB } from "../dbo/IdentityDB";

export class IdentityController {
    
    private readonly db: IdentityDB;
    private readonly hasher: PasswordHasher;

    constructor(db: IdentityDB) {
        this.db = db;
        this.hasher = new PasswordHasher();
    }

    public async login(request:any, response: any) {
        let hashed = this.hasher.hash(request.body.password, request.body.username);
        let user = await this.db.login(request.body.username, hashed);
        if (user) {
            response.json({ result: true });
        }
        else {
            response.json({ result: false });
        }
    }
}