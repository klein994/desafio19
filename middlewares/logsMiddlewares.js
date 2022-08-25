import { logger } from "./../containers/index.js";

export const logInfo = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
};

export const logWarning = (req, res, next) => {
    logger.warning(`${req.method} ${req.url}`);
    next();
};
