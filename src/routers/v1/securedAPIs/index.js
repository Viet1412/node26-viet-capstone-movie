const express = require("express");
const uploadController = require("../../../controllers/upload.controller");
const requiredRole = require("../../../middlewares/requiredRoles");
const uploadMiddleware = require("../../../middlewares/upload.middleware");
const userManagementRouters = require("./users.secured_routers");
const cinemaSystemManagementRouters = require("./cinemaSystems.secured_routers");
const cinemaGroupManagementRouters = require("./cinemaGroups.secured_routers");
const cinemaRoomManagementRouters = require("./cinemaRooms.secured_routers");
const movieManagementRouters = require("./movies.secured_routers");
const bannerManagementRouters = require("./banners.secured_routers");
const showtimeManagementRouters = require("./showtimes.secured_routers");

const securedRouters = express.Router();

securedRouters.use("/usersManagement", userManagementRouters);

// APIs - only admin can access 
securedRouters.use("/moviesManagement", requiredRole("admin"), movieManagementRouters);
securedRouters.use("/bannersManagement", requiredRole("admin"), bannerManagementRouters);
securedRouters.use("/cinemaSystemsManagement", requiredRole("admin"), cinemaSystemManagementRouters);
securedRouters.use("/cinemaGroupsManagement", requiredRole("admin"), cinemaGroupManagementRouters);
securedRouters.use("/cinemaRoomsManagement", requiredRole("admin"), cinemaRoomManagementRouters);
securedRouters.use("/showtimesManagement", requiredRole("admin"), showtimeManagementRouters);

// API just for uploading files
securedRouters.post(
  "/upload",
  uploadMiddleware.array("file"),
  uploadController()
);

module.exports = securedRouters;
