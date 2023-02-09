const express = require("express");
const cinemaGroupController = require("../../../controllers/cinemaGroups.controller");

const cinemaGroupManagementRouters = express.Router();

cinemaGroupManagementRouters.get("", cinemaGroupController.getEntityList());
cinemaGroupManagementRouters.get("/cinemaGroupListPagination", cinemaGroupController.getEntityListPagination());
cinemaGroupManagementRouters.get("/:id", cinemaGroupController.getEntityDetails());
cinemaGroupManagementRouters.post("", cinemaGroupController.create());
cinemaGroupManagementRouters.delete("/:id", cinemaGroupController.delete());
cinemaGroupManagementRouters.put("/:id", cinemaGroupController.update());
cinemaGroupManagementRouters.post("/search", cinemaGroupController.search());


module.exports = cinemaGroupManagementRouters;
