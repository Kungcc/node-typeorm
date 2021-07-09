import Route from "./routes/Route";
import RoleRoute from "./routes/RoleRoute";
import AuthRoute from "./routes/AuthRoute";
import TokenRoute from "./routes/TokenRoute";

export const router: Array<Route> = [
    new RoleRoute(),
    new AuthRoute(),
    new TokenRoute()
];