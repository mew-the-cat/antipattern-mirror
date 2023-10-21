import { Router } from "express";
import ChatController from "../../controllers/chat.controller";

const routes = Router();

// Create chat between the client user and the advisor user
routes.post("/chat/:clientId/:advisorId", ChatController.create);

// Delete chat between the client user and the advisor user
routes.delete("/chat/:clientId/:advisorId", ChatController.delete);

// Get chat between the client user and the advisor user
routes.get(
  "/chat/:clientId/:advisorId",
  ChatController.getOneChatBetweenTwoUsers
);

// Get ALL open chats of the given client user
routes.get("/chat/:clientId", ChatController.getAllChatsOfClientUser);

// Get ALL open chats of the given advisor user
routes.get("/chat/:advisorId", ChatController.getAllChatsOfAdvisorUser);

export default routes;
