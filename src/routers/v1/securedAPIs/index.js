const express = require("express");
const uploadController = require("../../../controllers/upload.controller");
const requiredRole = require("../../../middlewares/requiredRoles");
const uploadMiddleware = require("../../../middlewares/upload.middleware");
const cinemaGroupManagementRouters = require("./cinemaGroups.secured_routers");
const cinemaSystemManagementRouters = require("./cinemaSystems.secured_routers");
const movieManagementRouters = require("./movies.secured_routers");
const seatNameManagementRouters = require("./seatNames.secured_routers");
const {userManagementRouters} = require("./users.secured_routers");

const securedRouters = express.Router();

securedRouters.use("/usersManagement", userManagementRouters);

// APIs - only admin can access 
securedRouters.use("/moviesManagement", requiredRole("admin"), movieManagementRouters);
securedRouters.use("/seatNamesManagement", requiredRole("admin"), seatNameManagementRouters);
securedRouters.use("/cinemaSystemsManagement", requiredRole("admin"), cinemaSystemManagementRouters);
securedRouters.use("/cinemaGroupsManagement", requiredRole("admin"), cinemaGroupManagementRouters);

// API just for uploading files
securedRouters.post(
  "/upload",
  uploadMiddleware.array("file"),
  uploadController()
);

module.exports = securedRouters;
