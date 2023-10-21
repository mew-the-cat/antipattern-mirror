import express from "express";
import { Message } from "../database/models/message.model";

export default class MessageController {
  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const chatId = Number(req.params.chatId);
      const body = req.body;

      await Message.create({
        chat_id: chatId,
        from_id: body.from_id,
        message: body.message,
      });

      res.status(201);
    } catch (error) {
      return next(error);
    }
  }
}
