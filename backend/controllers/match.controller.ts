import express from "express";
import { Advisor } from "../database/models/advisor.model";
import sequelize from "../database/models/sequelize";
import { Match } from "../database/models/match.model";
import { Interest } from "../database/models/interest.model";
import { User } from "../database/models/user.model";
import { UserInterest } from "../database/models/userinterest.model";
import {Client} from "../database/models/client.model";
import {ExtractJwt} from "passport-jwt";
import fromAuthHeaderWithScheme = ExtractJwt.fromAuthHeaderWithScheme;

export default class MatchController {
  static async getRecommendation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // TODO: design a proper algorithm to find best matching advisor. Now returna just a random one
    try {
      const clientId = parseInt(req.params.clientId);

      // get Client info:
      const clientPref = await User.findOne({
        include: [
          {
            model: Client,
            attributes: ["id"],
            required: true,
            where: { id: clientId },
          },
          {
            model: Interest,
            attributes: ["name"],
          }
        ],
        attributes: [
          "firstname",
          "lastname",
          "email",
          "street",
          "location",
          "zip",
        ]
      });
      console.log("clientPref");
      console.log(clientPref);

      if (!clientPref) {
        res.status(404).json({ error: "No client found" });
      }

      // get Advisor info: returns hopefully json with table of id and interests
      const AdvisorData = await User.findAll({
        include: [
          {
            model: Advisor,
            attributes: ["id"],
            required: true
          },
          {
            model: Interest,
            attributes: ["name"],
          }
        ],
        attributes: [
            "firstname",
            "lastname",
            "email",
            "street",
            "location",
            "zip",
        ]

      })
      console.log("AdvisorData");
      console.log(AdvisorData);


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
          //@ts-ignore
          scores.push({ id: data[i].id, score: score , advisorData: data[i].advisorData});
        }
        return scores;
      };

      const sortByScore = (userScores: { id: number; score: number }[]) => {
        // Sorting the array of objects by the 'score' property
        userScores.sort((a, b) => b.score - a.score);
      }

      const data = [];
      for (let i = 0; i < AdvisorData.length; i++) {
        data.push({
          //@ts-ignore
            id: AdvisorData[i].Advisors[0].id,
          //@ts-ignore
            interests: AdvisorData[i].Interests.map((interest: { name: string; }) => interest.name),
            advisorData: AdvisorData[i]
        })
      }
      console.log("data Advisor");
      console.log(data);

      console.log("data Client");
      console.log({
        //@ts-ignore
        id: clientPref.Clients[0].id,
        //@ts-ignore
        interests: clientPref.getDataValue("Interests").map((interest: { name: string; }) => interest.name),
        clientData: clientPref
      });
      // Wieder einkommentieren
      const computedScores = computeScores({
        //@ts-ignore
        id: clientPref.Clients[0].id,
        //@ts-ignore
        interests: clientPref.getDataValue("Interests").map((interest: { name: string; }) => interest.name),
        //@ts-ignore
        clientData: clientPref
      }, data);
      const sortedScoredAdvisors = computedScores.sort((a, b) => b.score - a.score);
      console.log("sortedScoredAdvisors");
      console.log(sortedScoredAdvisors);
      res.status(200).json(sortedScoredAdvisors);
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
