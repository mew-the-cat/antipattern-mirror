import express from "express";
import { Chat } from "../database/models/chat.mode";

export default class ChatController {
  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const clientId = Number(req.params.clientId);
      const advisorId = Number(req.params.advisorId);

      await Chat.create({
        client_id: clientId,
        advisor_id: advisorId,
      });

      res.status(201);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const clientId = Number(req.params.clientId);
      const advisorId = Number(req.params.advisorId);

      const chat = await Chat.findOne({
        where: {
          client_id: clientId,
          advisor_id: advisorId,
        },
      });

      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }

      // Delete the product from the database
      await chat.destroy();
      res.status(200);
    } catch (error) {
      return next(error);
    }
  }

  static async getOneChatBetweenTwoUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const clientId = Number(req.params.clientId);
      const advisorId = Number(req.params.advisorId);

      const chat = await Chat.findOne({
        where: {
          client_id: clientId,
          advisor_id: advisorId,
        },
      });

      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }

      return res.status(200).json(chat);
    } catch (error) {
      return next(error);
    }
  }

  static async getAllChatsOfClientUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const clientId = Number(req.params.clientId);

      const chats = await Chat.findAll({
        where: {
          client_id: clientId,
        },
      });

      return res.status(200).json(chats);
    } catch (error) {
      return next(error);
    }
  }

  static async getAllChatsOfAdvisorUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const advisorId = Number(req.params.advisorId);

      const chats = await Chat.findAll({
        where: {
          advisor_id: advisorId,
        },
      });

      return res.status(200).json(chats);
    } catch (error) {
      return next(error);
    }
  }
}
