import express from "express";
import { Advisor } from "../database/models/advisor.model";
import sequelize from "../database/models/sequelize";
import { Match } from "../database/models/match.mode";

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

      res.status(200).json(randomAdvisor);
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

      await Match.create({
        client_id: clientId,
        advisor_id: advisorId,
        score: 0.5,
        accepted: false,
      });

      res.status(201);
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

      res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
