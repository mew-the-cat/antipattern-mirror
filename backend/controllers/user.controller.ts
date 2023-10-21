import express from "express";
import crypto from "crypto";
import {Salt} from "../services/salt.service";
import dayjs from "dayjs";
import {Caching} from "../services/cache.service";
import jwt from "jsonwebtoken";
import {User} from "../database/models/user.model";
import {Op} from "sequelize";
import sequelize from "../database/models/sequelize";
import {Advisor} from "../database/models/advisor.model";
import { Client } from "../database/models/client.model";

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
      const {role} = req.body;

      const {email} = req.body;
      const {password} = req.body;
      const confirmation = true;

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

      User.create({
        firstname: firstname,
        lastname: lastname,
        location: location,
        street: street,
        zip: zip,
        email: email,
        salt: salt,
        password: hashPassword,
        confirmation: confirmation
      }, {transaction: t}).then(async (user) => {
        const env = process.env.NODE_ENV || 'development';
        if(env === "development") {
          const verificationCode = crypto.createHash('md5').update(
              user.password.toString('hex').concat(
                  user.salt.toString('hex')).concat(
                  Salt.verification
              )
          ).digest('hex');

          console.info(req.method + "-" + req.url + ": Create User entry successful! User: ", user);

          if(role === "advisor") {
            const advisor = Advisor.create({
              user_id: user.id
            }, {transaction: t});
          } else {
            const client = Client.create({
              user_id: user.id
            }, {transaction: t});
          }

          User.sendVerificationMail(user, {transaction: t});

          return res.status(200).json({
            firstname: firstname,
            email: email,
            verification_code: verificationCode
          });
        }

        if(role === "advisor") {
          const advisor = Advisor.create({
            user_id: user.id
          }, {transaction: t});
        } else {
          const client = Client.create({
            user_id: user.id
          }, {transaction: t});
        }

        console.info(req.method + "-" + req.url + ": Create User entry successful! User: ", user);

        User.sendVerificationMail(user, {transaction: t});

        return res.status(200).json({
          firstname: firstname,
          email: email
        });
      }).catch(_err => {
        t.rollback();
        console.warn(new Error(req.method + "-" + req.url + ": Create User entry failed! Error: "), _err);
        return res.status(400).json(_err)
      });
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
        const users = await User.findAll({
            where: {
              confirmation: true,
              signup_verified: true
            }
        });

        console.info(req.method + "-" + req.url + ": Get Users entry successful! Users: ", users);
        return res.status(200).json(users);
    } catch (error) {
      return next(error);
    }
  }

  static async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const user = req.user as any;
console.log("A");
      if(user) {
        const saltedId = crypto.createHash('md5').update(
            user.id + "" + Salt.userId
        ).digest('hex');
        console.log("B");
        const payload = {
          id: saltedId,
          name: user.name,
          expiresAt: dayjs().add(12, 'h')
        }
        console.log("C");
        jwt.sign(payload, Salt.secret, {}, (err, token) => {
          if (err) {
            console.warn(new Error(req.method + "-" + req.url + ": Login User entry failed! JWT signing failed! Errors: "), err);
            return next("Error in jwt signing!");
          }
          console.log("D");
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
