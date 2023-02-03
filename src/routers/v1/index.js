const express = require("express");
const authorization = require("../../middlewares/authorization");
const authenRouter = require("./publicAPIs/authen.router");
// const pictureRouters = require("./publicAPIs/pictures.routers");
const securedRouters = require("./securedAPIs");

const v1 = express.Router();

// public APIs
v1.use("/authen", authenRouter);
// v1.use("/movies", pictureRouters);

// secured APIs
v1.use("/secured", authorization, securedRouters);

module.exports = v1;
