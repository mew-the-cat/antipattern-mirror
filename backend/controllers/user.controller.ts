import express from "express";

export default class UserController {
  static async createClient(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { user } = req.body;
      // TODO
    } catch (error) {
      return next(error);
    }
  }

  static async createAdvisor(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { user } = req.body;
      // TODO
    } catch (error) {
      return next(error);
    }
  }

  static async updateById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { user } = req.body;
      const id = req.params.id;
      // TODO
    } catch (error) {
      return next(error);
    }
  }

  static async deleteById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      // TODO
    } catch (error) {
      return next(error);
    }
  }

  static async getById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      // TODO
    } catch (error) {
      return next(error);
    }
  }
}
