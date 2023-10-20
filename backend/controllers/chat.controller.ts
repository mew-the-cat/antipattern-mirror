import express from "express";

export default class ChatController {
  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const clientId = req.params.clientId;
      const advisorId = req.params.advisorId;
      // TODO
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
      const clientId = req.params.clientId;
      const advisorId = req.params.advisorId;
      // TODO
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
      const clientId = req.params.clientId;
      const advisorId = req.params.advisorId;
      // TODO
    } catch (error) {
      return next(error);
    }
  }

  static async getAllChatsOfUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userId = req.params.userId;
      // TODO
    } catch (error) {
      return next(error);
    }
  }
}
