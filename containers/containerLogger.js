import log4js from "log4js";
import { dev } from "./../args/args.js";

class containerLogger {
    constructor() {
        log4js.configure({
            appenders: {
                console: { type: "console" },
                infoFile: { type: "file", filename: "./logs/info.log" },
                warningFile: { type: "file", filename: "./logs/warning.log" },
                errorFile: { type: "file", filename: "./logs/error.log" },
                infoLogger: {
                    type: "logLevelFilter",
                    appender: "infoFile",
                    level: "info",
                },
                warningLogger: {
                    type: "logLevelFilter",
                    appender: "warningFile",
                    level: "warn",
                },
                errorLogger: {
                    type: "logLevelFilter",
                    appender: "errorFile",
                    level: "error",
                },
            },
            categories: {
                default: {
                    appenders: [
                        "infoLogger",
                        "warningLogger",
                        "errorLogger",
                        "console",
                    ],
                    level: "all",
                },
                production: {
                    appenders: ["infoLogger", "warningLogger", "errorLogger"],
                    level: "all",
                },
            },
        });
        this.logger = log4js.getLogger(dev ? "default" : "production");
    }
    info(message) {
        this.logger.info(message);
    }
    warning(message) {
        this.logger.warn(message);
    }
    error(message) {
        this.logger.error(message);
    }
}

export default containerLogger;
