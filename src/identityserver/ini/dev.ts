// mkdir db || true && mongod --remove || true && mongod --install --logpath db/log.txt 
// && npm run remove && npm run init && npm run start
import * as fs from 'async-file';
import * as path from 'path';

(async () => {
    let exec = require('child_process').exec;
    
    // Mongo's DB Path.
    console.log('creating db...');
    let dbpath = path.join(__dirname, '../', 'db');
    if (await fs.exists(dbpath)) {
        await fs.rmdir(dbpath);
    }
    await fs.mkdir(dbpath);

    // Startup MongoDB.
    console.log('starting mongo...');
    exec(`mongod --dbpath ${dbpath}`);

    // Get some users in the db.
    console.log('removing users...');
    console.log('adding users...');
    exec(`npm run init`);
    console.log('starting app...');
    exec(`npm run start`);

})();