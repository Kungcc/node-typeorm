import {RoleController} from "./controllers/RoleController";

export const Routes = [{
    method: "get",
    route: "/api/roles",
    controller: RoleController,
    action: "all"
}, {
    method: "get",
    route: "/api/roles/:id",
    controller: RoleController,
    action: "one"
}, {
    method: "post",
    route: "/api/roles",
    controller: RoleController,
    action: "save"
}, {
    method: "delete",
    route: "/api/roles/:id",
    controller: RoleController,
    action: "remove"
}];