import { Router } from "express";
import userRoute from "./user.route";
import matchRoute from "./match.route";
import chatRoute from "./chat.route";
import messageRoute from "./message.route";
import interestRoute from "./interest.route";

const routes = Router();

routes.use("/", userRoute);
routes.use("/", matchRoute);
routes.use("/", chatRoute);
routes.use("/", messageRoute);
routes.use("/", interestRoute);

export default routes;
