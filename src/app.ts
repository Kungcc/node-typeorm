import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import {Request, Response} from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";
import createError from "http-errors";
import {router} from "./Router";
import httpStatus from "http-status";
import dbConfig from './config/oracle';
import {httpRequestTimer, register} from "./middlewares/PromMiddleware";
import httpContext from "express-http-context";


const app = express();
app.set('trust proxy', true);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(httpContext.middleware);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const startRouter = express.Router().get('/', function(req, res) {
    res.status(httpStatus.OK).json({ message: 'Hello nodejs restful API' });   
});

app.use((req: Request, res: Response, next: Function) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.use('/', startRouter);
app.get("/metrics", async function(req: express.Request, res: express.Response) {
  const end = httpRequestTimer.startTimer();
  const route = req.route.path;
  res.setHeader("Content-type", register.contentType);
  res.status(httpStatus.OK).send(await register.metrics());
  end({ route, code: res.statusCode, method: req.method });
});

for (const route of router) {
    app.use(route.getPrefix(), route.getRouter());
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(httpStatus.NOT_FOUND));
});


// use typeorm connect to mariadb
createConnection(dbConfig).then(connection => {
    //console.log(connection);
    console.log("oracle connection successed!");
}).catch(error => console.log("mariadb connection failed! errorMsg=",error));

app.listen(3000);