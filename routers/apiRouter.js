import { Router } from "express";
import apiControllers from "../controllers/apiControllers.js";
import authenticationController from "../controllers/authenticationController.js";
import { auth, debug } from "../middlewares/middlewares.js";
import compression from "compression";
import { logInfo } from "../middlewares/logsMiddlewares.js";

const router = new Router();
const {
    loginController,
    succesLogin,
    failureLogin,
    registerController,
    failureSignup,
    successSignup,
    logout,
} = authenticationController;

const { getName, productosTest, getInfo, getNumbers } = apiControllers;
// Login
router.post("/login", logInfo, loginController);
router.get("/successLogin", logInfo, succesLogin);
router.get("/failureLogin", logInfo, failureLogin);

//Signup
router.post("/signup", logInfo, registerController);
router.get("/failureSignup", logInfo, failureSignup);
router.get("/successSignup", logInfo, successSignup);

//Logout
router.post("/logout", logInfo, logout);

router.get("/login", logInfo, getName);
router.get("/productos-test", auth, logInfo, productosTest);
router.get("/getInfo", logInfo, getInfo);
router.get("/getInfo-debug", logInfo, debug, getInfo);
router.get("/getInfoZip", compression(), logInfo, getInfo);
router.get("/randoms/:cant?", logInfo, getNumbers);
router.get("/randoms-debug/:cant?", logInfo, debug, getNumbers);

export default router;
