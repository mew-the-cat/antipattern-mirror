import express from "express";
import crypto from "crypto";
import {Salt} from "../services/salt.service";
import dayjs from "dayjs";
import {Caching} from "../services/cache.service";
import jwt from "jsonwebtoken";
import {User} from "../database/models/user.model";
import {Op} from "sequelize";
import sequelize from "../database/models/sequelize";

export default class UserController {
  static async createUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const {firstname} = req.body;
      const {lastname} = req.body;
      const {location} = req.body;
      const {street} = req.body;
      const {zip} = req.body;

      const {email} = req.body;
      const {password} = req.body;
      const {confirmation} = req.body;

      const userEmail = await User.findOne({
        where: {
          email: email
        }
      });

      if (userEmail) {
        console.warn(new Error(req.method + "-" + req.url + ": Create User with email " + email + " entry failed! Email already exists!"));
        return next("Email already exists!");
      }

      const [salt, hashPassword] = User.hashPassword(password.toString('hex'));

      const t = await sequelize.transaction();
/*
      User.create({
        email: email,
        salt: salt,
        password: hashPassword,
        confirmation: confirmation
      }, {transaction: t}).then(user => {
        const env = process.env.NODE_ENV || 'development';
        if(env === "development") {
          const verificationCode = crypto.createHash('md5').update(
              user.password.toString('hex').concat(
                  user.salt.toString('hex')).concat(
                  Salt.verification
              )
          ).digest('hex');

          console.info(req.method + "-" + req.url + ": Create User entry successful! User: ", user);

          User.sendVerificationMail(user, {transaction: t});

          return res.status(200).json({
            name: name,
            email: email,
            verification_code: verificationCode
          });
        }

        console.info(req.method + "-" + req.url + ": Create User entry successful! User: ", user);

        User.sendVerificationMail(user, {transaction: t});

        return res.status(200).json({
          name: name,
          email: email
        });
      }).catch(_err => {
        t.rollback();
        console.warn(new Error(req.method + "-" + req.url + ": Create User entry failed! Error: "), _err);
        return res.status(400).json(_err)
      });*/
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

  static async verify(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const {code} = req.body;

      const user = await User.findOne({
        where: {
          confirmation: true,
          signup_verified: true,
          [Op.and]: [
            sequelize.literal(`MD5(LOWER(concat(HEX(password), HEX(salt), '${Salt.verification}'))) = '${code}'`)
          ]
        }
      });

      if (user) {
        console.warn(new Error(req.method + "-" + req.url + ": Verify User entry failed! User is already verified!"));
        return next("User is already verified!");
      }

      User.update({
        signup_verified: true
      }, {
        where: {
          confirmation: true,
          signup_verified: false,
          [Op.and]: [
            sequelize.literal(`MD5(LOWER(concat(HEX(password), HEX(salt), '${Salt.verification}'))) = '${code}'`)
          ]
        }
      }).then(user => {
        console.info(req.method + "-" + req.url + ": Verify User entry successful! Affected count: ", user);
        return res.status(200).json({});
      }).catch(_err => {
        console.warn(new Error(req.method + "-" + req.url + ": Verify User entry failed! Error: "), _err);
        return res.status(400).json(_err)
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {

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
