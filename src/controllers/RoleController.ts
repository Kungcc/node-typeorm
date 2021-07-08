import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Role} from "../entity/Role";

export class RoleController {

    private roleRepository = getRepository(Role);

    async all(request: Request, response: Response, next: NextFunction) {
        return await this.roleRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return await this.roleRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return await this.roleRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.roleRepository.findOne(request.params.id);
        await this.roleRepository.remove(userToRemove);
    }
}