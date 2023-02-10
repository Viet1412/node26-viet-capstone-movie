const express = require("express");
const cinemaGroupController = require("../../../controllers/cinemaGroups.controller");

const cinemaGroupManagementRouters = express.Router();

cinemaGroupManagementRouters.post("", cinemaGroupController.create());
cinemaGroupManagementRouters.delete("/:id", cinemaGroupController.delete());
cinemaGroupManagementRouters.put("/:id", cinemaGroupController.update());

module.exports = cinemaGroupManagementRouters;
