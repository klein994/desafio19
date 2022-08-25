import { Router } from "express";
import webControllers from "../controllers/webController.js";
import { auth } from "../middlewares/middlewares.js";
import { logInfo } from "../middlewares/logsMiddlewares.js";

const router = new Router();

const {
    inicio,
    login,
    logout,
    signup,
    signupError,
    loginError,
    info,
    infoZip,
    random,
} = webControllers;

router.get("/", auth, logInfo, inicio);
router.get("/login", logInfo, login);
router.get("/logout", logInfo, logout);
router.get("/signup", logInfo, signup);
router.get("/signupError", logInfo, signupError);
router.get("/loginError", logInfo, loginError);
router.get("/info", auth, logInfo, info);
router.get("/infoZip", auth, logInfo, infoZip);
router.get("/random", auth, logInfo, random);

export default router;
