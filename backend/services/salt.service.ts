import crypto from "crypto";

const env = process.env.NODE_ENV || 'development';

export class Salt {
    static verification = env === "development" ? Buffer.from("verificationSaltverificationSalt").toString('hex') : crypto.randomBytes(32).toString('hex');
    static recovery = env === "development" ? Buffer.from("recoverySaltrecoverySaltrecovery").toString('hex') : crypto.randomBytes(32).toString('hex');

    static secret = env === "development" ? Buffer.from("1111111111111111111111111111111122222222222222222222222222222222333333333333333333333333333333334444444444444444444444444444444455555555555555555555555555555555666666666666666666666666666666667777777777777777777777777777777788888888888888888888888888888888").toString('hex') : crypto.randomBytes(256).toString('hex');

    static userId = env === "development" ? Buffer.from("userIduserIduserIduserIduserIdus").toString('hex') : crypto.randomBytes(32).toString('hex');

    static forfeit = env === "development" ? Buffer.from("forfeitSaltforfeitSaltforfeitSal").toString('hex') : crypto.randomBytes(32).toString('hex');

}