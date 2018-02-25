declare let require:Function;
declare let process:any;

import { TokenValidator } from '../identityserver/services/tokenValidator';

var express = require("express");
var parser = require("body-parser");
var fs = require("fs");
var rsa = require("node-rsa");
var app = express();

app.use(function (req:any, res:any, next:any) {
    // Just some CORS access request headers.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use( async (req:any, res:any, next:any) => {
    let v = new TokenValidator();
    let auth = req.header('Authorization');
    if (await v.isValid(auth))
        next();
    else
    {
        res.json({
            success: false,
            error: 'Unauthorized'
        });
    }

});

app.use(parser.json());

app.route('/')
    .post(function(req:any, res:any) {
        res.json({ result: true, data: "here is some data after we validated your token." });
    });

var port = process.env.PORT || 3001;
app.listen(port);
console.log("Application listening on " + port);