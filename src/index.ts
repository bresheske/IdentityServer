import * as express from "express";
import * as parser from "body-parser";
import { Router } from './routes/router';

let router = new Router();
let app = express();

app.use(parser.json());

router.applyRoutes(app);

let port = process.env.PORT || 3000;
app.listen(port);
console.log(`Application listening on ${port}`);