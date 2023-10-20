import { Router } from "express";
import userRoute from "./user.route";
import matchRoute from "./match.route";
import chatRoute from "./chat.route";
import messageRoute from "./message.route";

const routes = Router();

routes.use("/", userRoute);
routes.use("/", matchRoute);
routes.use("/", chatRoute);
routes.use("/", messageRoute);

export default routes;
