import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/db.config.json')[env];

/*config.models = [
    Group,
    User,
    Exploration,
    Poi,
    PoiAddress,
    PoiCoordinates,
    PoiHint,
    Task,
    TaskChoice,
    TaskCloze,
    TaskClozeword,
    TaskGuessNumber,
    TaskGuessText,
    TaskGuessTextAnswer,
    TaskLocate,
    TaskOrder,
    UnlockPrerequisite,
    Team,
    Battle,
    Staff,
    Progress
];*/

//const  sequelize = new Sequelize(config.database, config.username, config.password, config);

config.models = [__dirname+ "/*.model.js"];

config.modelMatch = (filename: string, member: string) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
}

const  sequelize = config.url
    ? new Sequelize(config.url, config)
    : new Sequelize(config.database, config.username, config.password, config);

export default sequelize;