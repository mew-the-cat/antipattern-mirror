import { Router } from "express";
import UserController from "../../controllers/user.controller";

const routes = Router();

routes.post("/user/client", UserController.createClient);
routes.post("/user/advisor", UserController.createAdvisor);
routes.put("/user/:id", UserController.updateById);
routes.delete("/user/:id", UserController.deleteById);
routes.get("/user/:id", UserController.getById);

export default routes;
