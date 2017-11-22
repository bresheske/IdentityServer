
var express = require("express");
var parser = require("body-parser");
var fs = require("fs");
var rsa = require("node-rsa");

var app = express();

app.use(function (req, res, next) {
    // Just some CORS access request headers.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(function (req, res, next) {
    // This is the middleware to block/allow requests based on the authorization header.
    let failuremessage = { result: "false", message: "unauthorized" };
    let authheader = req.header('Authorization');
    if (!authheader || typeof authheader == 'undefined') {
        res.json(failuremessage);
        return;
    }
    try {
        // first, decrypt it.
        let authorization = JSON.parse(authheader);
        if (!authorization) {
            res.json(failuremessage);
            return;
        }
        let publickey = fs.readFileSync('signingCert.pub');
        let key = new rsa(publickey, 'public');
        let dec = JSON.parse(key.decryptPublic(authorization.signature));

        // now just check if the data matches up.
        if (authorization.identity.created != dec.created) {
            res.json(failuremessage);
            return;
        }

        // we're good and authorized!
        next();
    }
    catch (ex) {
        console.log(ex);
        res.json(failuremessage);
    }
});

app.use(parser.json());

app.route('/')
    .post(function(req, res) {
        res.json({ result: true, data: "here is some data after we validated your token." });
    });

var port = process.env.PORT || 3001;
app.listen(port);
console.log("Application listening on " + port);