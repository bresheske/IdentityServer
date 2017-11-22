import { PasswordHasher } from '../services/passwordHasher';
import { IdentityDB } from "../dbo/IdentityDB";
import { TokenGenerator } from "../services/tokenGenerator";
import { IdentityModel, ClaimModel } from "../dbo/identityModel";

export class IdentityController {
    
    private readonly db: IdentityDB;
    private readonly hasher: PasswordHasher;
    private readonly tokenGenerator: TokenGenerator;

    constructor(db: IdentityDB) {
        this.db = db;
        this.hasher = new PasswordHasher();
        this.tokenGenerator = new TokenGenerator();
    }

    public async login(request:any, response: any) {
        let hashed = this.hasher.hash(request.body.password, request.body.username);
        let user = await this.db.login(request.body.username, hashed);
        if (user) {
            let identity = new IdentityModel();
            identity.username = user.username;
            identity.claims = user.claims.map((c: any) => ({ key: c.key, value: c.value } as ClaimModel));

            let token = await this.tokenGenerator.generateToken(identity);
            response.json({ result: true, token: token });
        }
        else {
            response.json({ result: false });
        }
    }
}