import express from "express";
import crypto from "crypto";
import {Salt} from "../services/salt.service";
import dayjs from "dayjs";
import {Caching} from "../services/cache.service";
import jwt from "jsonwebtoken";

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

  static async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const user = req.user as any;

      if(user) {
        const saltedId = crypto.createHash('md5').update(
            user.id + "" + Salt.userId
        ).digest('hex');

        const payload = {
          id: saltedId,
          name: user.name,
          expiresAt: dayjs().add(12, 'h')
        }

        jwt.sign(payload, Salt.secret, {}, (err, token) => {
          if (err) {
            console.warn(new Error(req.method + "-" + req.url + ": Login User entry failed! JWT signing failed! Errors: "), err);
            return next("Error in jwt signing!");
          }

          console.info(req.method + "-" + req.url + ": Login User with ID " + user.id + " successful!" );
          return res.status(200).json({
            accessToken: `${token}`,
            tokenType: "Bearer",
            expiresAt: Caching.getCache().get(payload.id)
          });
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const user = req.user as any;
      if(user) {
        const saltedId = crypto.createHash('md5').update(
            user.id + "" + Salt.userId
        ).digest('hex');

        Caching.getCache().del(saltedId);

        console.info(req.method + "-" + req.url + ": Logout User with ID " + user.id + " successful!" );
        return res.status(200).json({
          accessToken: "",
          tokenType: "",
          expiresAt: 0
        });
      }

      console.warn(new Error(req.method + "-" + req.url + ": Logout User entry failed! User does not exist!"));
      return res.status(400).json({});
    } catch (error) {
      return next(error);
    }
  }
}
