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

// Get ALL open chats of the given user (no matter if client or advisor)
routes.get("/chat/:userId", ChatController.getAllChatsOfUser);

export default routes;
