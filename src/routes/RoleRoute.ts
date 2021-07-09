import RoleController from "../controllers/RoleController"
import Route from "./Route";

export default class RoleRoute extends Route {
    private roleController = new RoleController();

    constructor() {
        super();
        this.setRoutes();
        this.prefix = '/api/roles';
    }

    protected setRoutes() {
        this.router.get('/', this.roleController.all);
        this.router.get('/:id', this.roleController.one);
        this.router.post('/', this.roleController.save);
        this.router.delete('/:id', this.roleController.remove);
    }
}
