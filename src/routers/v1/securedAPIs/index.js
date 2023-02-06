const express = require("express");
const uploadController = require("../../../controllers/upload.controller");
const requiredRole = require("../../../middlewares/requiredRoles");
const uploadMiddleware = require("../../../middlewares/upload.middleware");
const movieManagementRouters = require("./movies.secured_routers");
const {userManagementRouters} = require("./users.secured_routers");

const securedRouters = express.Router();

securedRouters.use("/usersManagement", userManagementRouters);

// only admin can manage movies
securedRouters.use("/moviesManagement", requiredRole("admin"), movieManagementRouters);

// API just for uploading files
securedRouters.post(
  "/upload",
  uploadMiddleware.array("file"),
  uploadController()
);

module.exports = securedRouters;
