import { Token } from "../dto/token";
import { IdentityModel } from "../dbo/identityModel";
import { TokenSignature } from "../dto/tokenSignature";
import * as fs from 'async-file';

export class TokenGenerator {
    private crypto: any = require('node-rsa');
    private keyfile: string = require('../config.json').signingCert;
    private keytype: string = require('../config.json').signingCertType;

    constructor() {

    }

    async generateToken(identityModel: IdentityModel) : Promise<TokenSignature> {
        // Create a Token DTO, sign it, encrypt it, do some nasty stuff perhaps.

        let token = {
            username: identityModel.username,
            claims: identityModel.claims,
            created: new Date()
        } as Token;
        
        let file = await fs.readFile(this.keyfile);
        let key = new this.crypto(file, this.keytype);
        
        let stringtoken = JSON.stringify(token);
        let encrypted = key.encryptPrivate(stringtoken, 'base64');

        let signature = {
            identity: token,
            signature: encrypted
        } as TokenSignature;

        return signature;
    }
}