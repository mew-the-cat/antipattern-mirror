import passport from "passport";
import passportLocal from "passport-local";
import passportJWT, {ExtractJwt} from "passport-jwt";
import {User} from "../database/models/user.model";
import {Salt} from "./salt.service";
import {Op} from "sequelize";
import sequelize from "../database/models/sequelize";
import dayjs from "dayjs";

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async (email, password, done) => {
        console.log("login");
            try {
                console.log("aa");
                const user = await User.findOne({
                    where: {
                        confirmation: true,
                        signup_verified: true,
                        email
                    },
                });
                console.log("bb");
                if(!user) {
                    return done(undefined, false, {message: "User not found"});
                }
                console.log("cc");
                if(User.validatePassword(password, user)) {
                    return done(undefined, user, {message: "Logged in successfully"});
                }
                console.log("dd");
                return done(undefined, false, {message: "Wrong password"});
            } catch (error) {
                console.log("ee");
                return done(error);
            }
        }
    )
)

passport.use(
    'jwt',
    new JWTStrategy({
            secretOrKey: Salt.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                // @ts-ignore
                if(token.expiresAt === undefined || dayjs() >= dayjs(token.expiresAt)) {
                    return done(undefined, false, {message: "Invalid Token"});
                }

                const user = await User.findOne({
                    where: {
                        confirmation: true,
                        signup_verified: true,
                        [Op.and]: [
                            sequelize.literal(`MD5(LOWER(concat(User.id, '${Salt.userId}'))) = '${token.id}'`)
                        ]
                    },
                });

                if(!user) {
                    return done(undefined, false, {message: "User not found"});
                }

                return done(undefined, user, {message: "Logged in successfully"});
            } catch (error) {
                return done(error);
            }
        })
)

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user : Express.User, done) => {
    done(null, user);
})

export default passport;