import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import {Request, Response} from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";
import createError from "http-errors";
import {router} from "./Router";
import httpStatus from "http-Status";

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const startRouter = express.Router().get('/', function(req, res) {
    res.json({ message: 'Hello nodejs restful API' });   
});

app.use((request: Request, response: Response, next: Function) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

//建立起第一層的router
app.use('/', startRouter);
for (const route of router) {
    app.use(route.getPrefix(), route.getRouter());
}

app.listen(3000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(httpStatus.NOT_FOUND));
});

// use typeorm connect to mariadb
createConnection().then(async connection => {
    console.log("mariadb connection successed!");
}).catch(error => console.log("mariadb connection failed! errorMsh=",error));

module.exports = app;