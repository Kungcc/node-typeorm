import {check} from "express-validator";
import {showApiError} from "../middlewares/AuthMiddleware";

export const loginRequest = [
    check('username').exists().isLength({min: 6}),
    check('password').exists().isLength({min: 6}),
    showApiError
];