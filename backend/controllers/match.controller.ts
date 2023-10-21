import express from "express";
import { Advisor } from "../database/models/advisor.model";
import sequelize from "../database/models/sequelize";
import { Match } from "../database/models/match.mode";
import { Chat } from "../database/models/chat.mode";

export default class MatchController {
  static async getRecommendation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // TODO: design a proper algorithm to find best matching advisor. Now returna just a random one
    try {
      const clientId = req.params.clientId;
      const randomAdvisor = await Advisor.findOne({
        order: sequelize.random(),
      });

      if (randomAdvisor) {
        res.status(404).json({ error: "No advisor found" });
      }

      res.json(randomAdvisor);
    } catch (error) {
      return next(error);
    }
  }

  static async initiateMatch(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const clientId = Number(req.params.clientId);
      const advisorId = Number(req.params.advisorId);

      const newMatch = await Match.create({
        client_id: clientId,
        advisor_id: advisorId,
        score: 0.5,
        accepted: false,
      });

      res.status(201).json(newMatch);
    } catch (error) {
      return next(error);
    }
  }

  static async acceptMatch(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // Update match entity
      const matchId = req.params.matchId;
      const match = await Match.findByPk(matchId);

      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }

      match.accepted = true;

      await match.save();

      // Create new chat entity

      const newChat = await Chat.create({
        client_id: match.client_id,
        advisor_id: match.advisor_id,
      });

      res.status(201).json(newChat);
    } catch (error) {
      return next(error);
    }
  }
}
