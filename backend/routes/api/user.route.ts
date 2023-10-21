import { Router } from "express";
import UserController from "../../controllers/user.controller";

const routes = Router();

routes.post("/user", UserController.createUser);
routes.get("/user/:id", UserController.getById);
routes.get("/user", UserController.getAll);
routes.post("/user/verify", UserController.verify)
routes.post("/users/login", UserController.login)
routes.post("/users/logout", UserController.logout)

export default routes;
