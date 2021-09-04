import MailController from "../controllers/MailController"
import Route from "./Route";

export default class MailRoute extends Route {
    private mailController = new MailController();

    constructor() {
        super();
        this.setRoutes();
        this.prefix = '/api/mail';
    }

    protected setRoutes() {
        this.router.get('/', this.mailController.sendMail);
    }
}
