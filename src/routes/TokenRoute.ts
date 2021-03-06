
import { Request,Response } from "express";
import Route from "./Route";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

export default class TokenRoute extends Route {

    constructor() {
        super();
        this.setRoutes();
        this.prefix = '/api/token';
    }

    protected setRoutes() {
        this.router.post('/', (req:Request,res:Response) => {
            const token = jwt.sign({
                ...req.body
            },'Agwenbi',{
                expiresIn: (60 * 60 * 24) //1ĺ¤Šććć
            });

            res.status(httpStatus.OK).json({
                msg:'Success',
                token
            });
        });
    }
}