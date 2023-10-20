import express from "express";

export default class MessageController {
  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const chatId = req.params.chatId;
      // TODO
    } catch (error) {
      return next(error);
    }
  }
}
