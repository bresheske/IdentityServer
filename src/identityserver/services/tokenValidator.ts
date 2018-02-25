import * as fs from 'async-file';

export class TokenValidator {
    private keyfile: string = require('../config.json').signingCertPublic;
    private hasher:any = require('sha512');
    private crypto: any = require('node-rsa');
    
    public async isValid(token:string): Promise<boolean> {

        try {
            if (!token)
                return false;

            let authtoken = JSON.parse(token);
            if (!authtoken)
                return false;
    
            // First decrypt the signature.
            let pubfile = await fs.readFile(this.keyfile);
            let publickey = new this.crypto(pubfile, 'public');
            let dec = publickey.decryptPublic(authtoken.token.signature, 'utf8');

            // Now we hash the token and compare it against the signature.
            let tokenstring = JSON.stringify(authtoken.token.identity);
            let hash = this.hasher(tokenstring).toString('base64');
            if (hash !== dec)
                return false;

            // Now just make sure the token hasn't already expired.
            let now = new Date();
            let expires = new Date(authtoken.token.identity.expires);
            if (now >= expires)
                return false;
        
            return true;
        }
        catch {
            return false;
        }

    }

}