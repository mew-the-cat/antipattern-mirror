import fs from 'fs';
import util from 'util';
import dayjs from "dayjs";
import 'dayjs/locale/de';

function defaultFormatter(level: string, args: any[]) {
    return `${dayjs().locale("de").format("YYYY.MM.DD-HH:mm:ss")} [${level}] ` + [...args].map((item) => util.inspect(item)).join(" ") + "\n";
}

/**
 *
 * @param {*} param0
 */
function consoleLogToFile({ logFilePath, formatter = defaultFormatter, includes = [], flags = "a" }: { logFilePath: string, formatter?: (level: string, args: any[]) => string, includes?: string[], flags?: string }) {
    // const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;

    if (!logFilePath) {
        throw new Error('"logFilePath" is required');
    }

    const logFileStream = fs.createWriteStream(logFilePath, { flags });

    /*
    console.log = function (...args: any[]) {
        originalLog.apply(console, args);
        logToFile("log", args);
    };
    */

    console.warn = function (...args: any[]) {
        originalWarn.apply(console, args);
        logToFile("warn", args);
    };

    console.error = function (...args: any[]) {
        originalError.apply(console, args);
        logToFile("error", args);
    };

    // Wenn man die Daten mal nicht ausgegeben haben will:   [args[0]]
    console.info = function (...args: any[]) {
        originalInfo.apply(console, [args[0]]);
        logToFile("info", args);
    };

    function logToFile(level: string, args: any[]) {
        if (Array.isArray(includes) && includes.length) {
            if (!includes.includes(level)) return;
        }

        logFileStream.write(formatter(level, args));
    }
}

export { consoleLogToFile };