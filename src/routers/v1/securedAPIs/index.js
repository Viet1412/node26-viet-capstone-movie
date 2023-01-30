const express = require("express");
const uploadController = require("../../../controllers/upload.controller");
const uploadMiddleware = require("../../../middlewares/upload.middleware");
const pictureManagementRouters = require("./pictures.secured_routers");
const {
  userManagementRouters,
  userActionRouters,
} = require("./users.secured_routers");

const securedRouters = express.Router();

securedRouters.use("/usersManagement", userManagementRouters);
securedRouters.use("/userAction", userActionRouters);

securedRouters.use("/picturesManagement", pictureManagementRouters);

// API just for uploading files
securedRouters.post(
  "/upload",
  uploadMiddleware.array("file"),
  uploadController()
);

module.exports = securedRouters;
