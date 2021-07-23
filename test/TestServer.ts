import {createConnection} from "typeorm";
import express from "express";
import dbConfig from '../src/config/maria';
import http from "http";
import logger from "morgan";
import path from "path";
import httpContext from "express-http-context";
import cookieParser from "cookie-parser";
import {router} from "../src/Router";
import createError from "http-errors";
import httpStatus from "http-status";

export class TestServer {

    private readonly app: express.Application;
    private readonly server: http.Server;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
    }

    public App(): express.Application {
        return this.app;
    }

    public async start(): Promise<http.Server> {
        this.expressConfiguration();
        this.configurationRouter();

        createConnection(dbConfig).then(connection => {
            console.log("unit test mariadb connection successed!");
        }).catch(error => console.log("unit test mariadb connection failed! errorMsg=",error));
        return this.server;
    }

    private expressConfiguration(): void {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'jade');

        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(httpContext.middleware);
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

     private configurationRouter(): void {
        for (const route of router) {
            this.app.use(route.getPrefix(), route.getRouter());
        }

        this.app.use(function(req, res, next) {
            next(createError(httpStatus.NOT_FOUND));
        });
    }
}