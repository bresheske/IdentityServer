import * as webrequest from 'web-request';

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
    console.dir(result.content);
})();