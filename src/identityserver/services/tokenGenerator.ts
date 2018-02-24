import { Token } from "../dto/token";
import { IdentityModel } from "../dbo/identityModel";
import { TokenSignature } from "../dto/tokenSignature";
import * as fs from 'async-file';

export class TokenGenerator {
    private crypto: any = require('node-rsa');
    private keyfile: string = require('../config.json').signingCert;
    private minutes: number = require('../config.json').validMinutes;
    private hasher:any = require('sha512');

    async generateToken(identityModel: IdentityModel) : Promise<TokenSignature> {
        // Create a Token DTO, sign it, encrypt it, do some nasty stuff perhaps.
        let now = new Date();
        let expires = new Date();
        expires.setMinutes(now.getMinutes() + this.minutes);
        let token = {
            username: identityModel.username,
            claims: identityModel.claims,
            created: now,
            expires: expires
        } as Token;
        
        let file = await fs.readFile(this.keyfile);
        let key = new this.crypto(file);
        
        let stringtoken = JSON.stringify(token);
        let hashedtoken = this.hasher(stringtoken).toString('hex');
        let encrypted = key.encryptPrivate(hashedtoken, 'base64');

        let signature = {
            identity: token,
            signature: encrypted
        } as TokenSignature;

        return signature;
    }
}