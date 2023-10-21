import express from "express";
import { Advisor } from "../database/models/advisor.model";
import sequelize from "../database/models/sequelize";
import { Match } from "../database/models/match.model";
import { Interest } from "../database/models/interest.model";
import { User } from "../database/models/user.model";
import { UserInterest } from "../database/models/userinterest.model";

export default class MatchController {
  static async getRecommendation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // TODO: design a proper algorithm to find best matching advisor. Now returna just a random one
    try {
      const clientId = req.params.clientId;

      // get Client info:
      const clientPref = await User.finByPk({ clientId,//need to optimize!
        include: [
          {
            model: Client,
            attribute: ["id"]
          },
          {
            model: Interest,
            attributes: ["name"],
            through: {
              model: UserInterest
            }

          }
        ],
        attributes: []
      });

      if (clientPref) {
        res.status(404).json({ error: "No client found" });
      }

      // get Advisor info: returns hopefully json with table of id and interests
      const AdvisorData = await User.findAll({
        include: [
          {
            model: Advisor,
            attributes: ["id"]
          },
          {
            model: Interest,
            attributes: ["name"],
            through: {
              model: UserInterest
            }
          }
        ],
        attributes: []

      })

      // logic 
      // Compute the scores
      const computeScores = (user:{ id: number; interests: string[] } ,data: { id: number; interests: string[] }[]): { id: number; score: number }[] => {
        const scores: { id: number; score: number }[] = [];
        const userset: Set<string> = new Set(user.interests)
        for (let i = 0; i < data.length; i++) {
          let dataset: Set<string> = new Set(data[i].interests);
          let scoreset: Set<string> = new Set();
          dataset.forEach(element => {if (userset.has(element)) {scoreset.add(element)}})
          // maybe only userset size for max. personalization!
          const score =  scoreset.size / (userset.size + dataset.size)
          scores.push({ id: data[i].id, score: score });
        }
        return scores;
      };

      const sortByScore = (userScores: { id: number; score: number }[]) => {
        // Sorting the array of objects by the 'score' property
        userScores.sort((a, b) => b.score - a.score);
      }

      const computedScores = computeScores(clientPref, AdvisorData);
      const sortedScoredAdvisors = sortByScore(computedScores);

      res.json(sortedScoredAdvisors);
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
