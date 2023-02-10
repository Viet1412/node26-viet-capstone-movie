const express = require("express");
const authorization = require("../../middlewares/authorization");
const authenRouter = require("./publicAPIs/authen.router");
const bannerRouters = require("./publicAPIs/banners.routers");
const movieRouters = require("./publicAPIs/movies.routers");
const securedRouters = require("./securedAPIs");

const v1 = express.Router();

// public APIs
v1.use("/authen", authenRouter);
v1.use("/movies", movieRouters);
v1.use("/banners", bannerRouters);

// secured APIs
v1.use("/secured", authorization, securedRouters);

module.exports = v1;
