import AuthController from "../controllers/AuthController"
import {loginRequest} from "../models/LoginRequest";
import Route from "./Route";
import {JwtTokenMiddleware} from "../middlewares/AuthMiddleware"

export default class AuthRoute extends Route {
    private authController = new AuthController();

    constructor() {
        super();
        this.setRoutes();
        this.prefix = '/api/auth';
    }

    protected setRoutes() {
        this.router.get('/', this.authController.all);
        this.router.get('/:username', JwtTokenMiddleware, this.authController.one);
        this.router.post('/', loginRequest, this.authController.save);
    }
}
