import express from "express";
import { Chat } from "../database/models/chat.model";
import {Message} from "../database/models/message.model";
import {User} from "../database/models/user.model";

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
      }).then((value) => {
        return res.status(200).json({
          value
        });
      }).catch((error) => {
        return res.status(400).json(error);
      });
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
      await chat.destroy().then((value) => {
        return res.status(200).json({
          value
        });
      }).catch((error) => {
        return res.status(400).json(error);
      });
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
        include: [
          {
            model: Message,
            attributes: ["message"],
            include: [
              {
                model: User,
                attributes: [
                    'firstname',
                    'lastname',
                ]
              }
            ]
          }
        ]
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
        include: [
          {
            model: Message,
            attributes: ["message"],
            include: [
              {
                model: User,
                attributes: [
                  'firstname',
                  'lastname',
                ]
              }
            ]
          }
        ]
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

      console.log(advisorId);

      const chats = await Chat.findAll({
        where: {
          advisor_id: advisorId,
        },
        include: [
          {
            model: Message,
            attributes: ["message"],
            include: [
              {
                model: User,
                attributes: [
                  'firstname',
                  'lastname',
                ]
              }
            ]
          }
        ]
      });

      return res.status(200).json(chats);
    } catch (error) {
      return next(error);
    }
  }

  static async message(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
  ) {
    try {
      const {message} = req.body;
      const chatId = Number(req.params.chatId);
      const fromId = Number(req.params.fromId);

      await Message.create({
          chat_id: chatId,
          from_id: fromId,
          message: message,
      }).then((value) => {
        return res.status(200).json({
          value
        });
      }).catch((error) => {
        return res.status(400).json(error);
      });
    } catch (error) {
      return next(error);
    }
  }
}
