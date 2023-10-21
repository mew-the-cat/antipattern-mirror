import { Router } from "express";
import UserController from "../../controllers/user.controller";
import {body} from "express-validator";
import passport from "../../services/auth.service";

const routes = Router();

routes.post("/user", UserController.createUser);
routes.get("/user/:id", UserController.getById);
routes.get("/user", UserController.getAll);
routes.post("/user/verify", UserController.verify)
routes.post(
    "/user/login",
    passport.authenticate("login", {session: false}),
    [
        body('email').notEmpty().isEmail(),
        body('password').notEmpty()
    ],
    UserController.login
)
routes.post(
    "/user/logout",
    passport.authenticate('jwt', {session: false}),
    UserController.logout
)

export default routes;
