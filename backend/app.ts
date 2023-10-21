import express from 'express';
import dayjs from "dayjs";
import {consoleLogToFile} from "./services/log.service";
import http from "http";
import helmet from "helmet";
import bodyParser from "body-parser";
import router from './routes';
import cors from "cors";
import {initializeAssociations} from "./database/associations";
import passport from "passport";

const isProduction = process.env.NODE_ENV === 'production';

consoleLogToFile({
    logFilePath: "log/" + dayjs().locale("de").format("YYYY.MM.DD_HH-mm-ss") +  ".log",
});

/*
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // x minutes
    max: 100, // limit each IP to x requests per windowMs
    message: 'Too many requests received. Try again later!',
    standardHeaders: true,
});
*/

initializeAssociations();

const app = express();

app.use(cors({
    preflightContinue: true,
}));

app.get('/', (req, res) => {
    if(isProduction) {
        res.send('>[_____]*>');
    } else {
        res.send('>_<');
    }
});

//app.use(limiter);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);
app.use(helmet());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.warn(new Error(err.statusCode + " " + err.message + ": "), err);
    if (isProduction) {
        return res.status(err.statusCode || 500).json({message: err.message});
    }
    return res.status(err.statusCode || 500).json({message: err.message, error: err});
})

app.set('port', 3001);

const server = http.createServer(app);

server.listen(3001, () => {
    console.info('The application is listening on port 3001!');
});