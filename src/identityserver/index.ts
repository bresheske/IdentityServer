import * as express from "express";
import * as parser from "body-parser";
import { Router } from './routes/router';

let router = new Router();
let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(parser.json());

router.applyRoutes(app);

let port = process.env.PORT || 3000;
app.listen(port);
console.log(`Application listening on ${port}`);