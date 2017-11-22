import * as fs from 'async-file';
let crypto: any = require('node-rsa');
let keyfile: string = require('../config.json').signingCert;
let keytype: string = require('../config.json').signingCertType;

(async() => {
    let file = await fs.readFile(keyfile);
    let key = new crypto(file, keytype);
    let pub = key.exportKey('public');
    await fs.writeTextFile('publickey.pub', pub);
})();

