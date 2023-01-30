const express = require("express");
const authenController = require("../../../controllers/authen.controller");

const authenRouter = express.Router();

authenRouter.post("/signUp", authenController.signUp());
authenRouter.post("/logIn", authenController.logIn());


module.exports = authenRouter;
