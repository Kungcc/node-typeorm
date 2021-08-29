import RoleController from "../controllers/RoleController"
import Route from "./Route";
import {before, after} from "../middlewares/PromMiddleware";
import { requiresAuth } from 'express-openid-connect';

export default class RoleRoute extends Route {
    private roleController = new RoleController();

    constructor() {
        super();
        this.setRoutes();
        this.prefix = '/api/roles';
    }

    protected setRoutes() {
        this.router.get('/',  requiresAuth(), before, after, this.roleController.all);
        this.router.get('/:id', before, after, this.roleController.one);
        this.router.post('/', before, after, this.roleController.save);
        this.router.delete('/:id', before, after, this.roleController.remove);
    }
}
