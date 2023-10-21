import { Router } from "express";
import ChatController from "../../controllers/chat.controller";

const routes = Router();

// Create chat between the client user and the advisor user
routes.post("/chat/conversation/:clientId/:advisorId", ChatController.create);

// Delete chat between the client user and the advisor user
routes.delete("/chat/conversation/:clientId/:advisorId", ChatController.delete);

// Get chat between the client user and the advisor user
routes.get(
  "/chat/conversation/:clientId/:advisorId",
  ChatController.getOneChatBetweenTwoUsers
);

// Get ALL open chats of the given client user
routes.get("/chat/user/:clientId", ChatController.getAllChatsOfClientUser);

// Get ALL open chats of the given advisor user
routes.get("/chat/advisor/:advisorId", ChatController.getAllChatsOfAdvisorUser);

routes.post("/chat/message/:chatId/:fromId", ChatController.message);

export default routes;
