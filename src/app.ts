import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as path from "path";
import * as createError from "http-errors";
import {router} from "./Router";

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

//建立起第一層的router
app.use('/', startRouter);
for (const route of router) {
    app.use(route.getPrefix(), route.getRouter());
}

// register express routes from defined application routes
// Routes.forEach(route => {
//     (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
//         const result = (new (route.controller as any))[route.action](req, res, next);
//         if (result instanceof Promise) {
//             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
//         } else if (result !== null && result !== undefined) {
//             res.json(result);
//         }
//     });
// });

app.listen(3000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// use typeorm connect to mariadb
createConnection().then(async connection => {
    console.log("mariadb connection successed!");
}).catch(error => console.log("mariadb connection failed! errorMsh=",error));

module.exports = app;