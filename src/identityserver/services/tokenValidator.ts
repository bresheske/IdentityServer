import * as fs from 'async-file';

export class TokenValidator {
    private keyfile: string = require('../config.json').signingCert;
    private hasher:any = require('sha512');
    private crypto: any = require('node-rsa');
    
    public async isValid(token:string): Promise<boolean> {

        try {
            let authtoken = JSON.parse(token);
            if (!authtoken)
                return false;
    
            // First decrypt the signature.
            let privatekey = await fs.readFile(this.keyfile);
            let key = new this.crypto(privatekey);
            let pub = key.exportKey('public');
            let publickey = new this.crypto(pub, 'public');
            let dec = publickey.decryptPublic(authtoken.token.signature, 'base64')
                .toString('hex');
            
            // Now we hash the token and compare it against the signature.
            console.log("COMPUTED TOKEN:::");
            let tokenstring = JSON.stringify(authtoken.token.identity);
            console.log(tokenstring);
            let hash = this.hasher(tokenstring).toString('hex');

            console.log("Decrypted: ");
            console.log(dec);
            console.log("Computed Hash: ");
            console.log(hash);
            if (hash !== dec)
                return false;
        
            return true;
        }
        catch {
            return false;
        }

    }

}