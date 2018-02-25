import * as webrequest from 'web-request';
import { TokenValidator } from '../services/tokenValidator';

(async ()  => {
    let data = {
        username: "admin",
        password: "password"
    };
    let headers = {
        'Content-Type': 'application/json'
    };
    let opts = { headers: headers };
    var result = await webrequest.post('http://localhost:3000/login', opts, JSON.stringify(data));
    
    console.log("------ Token Generated ------");
    let token = JSON.parse(result.content).token;
    console.dir(token);

    let validator = new TokenValidator();
    console.log("------ Validated Results ------");
    console.log(await validator.isValid(JSON.stringify(token)));
})();