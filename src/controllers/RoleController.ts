import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Role} from "../entity/Role";
export default class RoleController {

    async all(request: Request, response: Response, next: NextFunction) {
        const roles = await getRepository(Role).find();
        return response.status(200).json(roles);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const role = await getRepository(Role).findOne(request.params.id);
        return response.status(200).json(role);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const role = await getRepository(Role).save(request.body);
        return response.status(200).json(role);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const deleteRole = await getRepository(Role).delete(request.params.id);
        return response.status(200).json(deleteRole);
    }
}