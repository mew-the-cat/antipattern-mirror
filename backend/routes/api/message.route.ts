import { Router } from "express";
import MessageController from "../../controllers/message.controller";

const routes = Router();

// Creates a message in the given chat
routes.post("/message/:chatId", MessageController.create);

export default routes;
