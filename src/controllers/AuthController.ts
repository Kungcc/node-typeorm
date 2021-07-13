import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Auth} from "../models/auth";
import httpStatus from "http-Status";

export default class AuthController {

    async all(request: Request, response: Response, next: NextFunction) {
        const auth = await getRepository(Auth).find();
        return response.status(httpStatus.OK).json(auth);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const auth = await getRepository(Auth).findOne(request.params.username);
            return response.status(httpStatus.OK).json(auth);
        } catch (e) {
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const auth = await getRepository(Auth).save(request.body);
        return response.status(httpStatus.OK).json(auth);
    }

}