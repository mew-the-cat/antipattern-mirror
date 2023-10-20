import express from "express";

export default class MatchController {
  static async getRecommendation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // TODO
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
      const advisorId = req.params.advisorId;
      // TODO
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
      const matchId = req.params.matchId;
      // TODO
    } catch (error) {
      return next(error);
    }
  }

  static async declineMatch(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const matchId = req.params.matchId;
      // TODO
    } catch (error) {
      return next(error);
    }
  }
}
