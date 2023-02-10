const express = require("express");
const cinemaGroupController = require("../../../controllers/cinemaGroups.controller");

const cinemaGroupRouters = express.Router();

cinemaGroupRouters.get("", cinemaGroupController.getEntityList());
cinemaGroupRouters.get("/cinemaGroupListPagination", cinemaGroupController.getEntityListPagination());
cinemaGroupRouters.get("/:id", cinemaGroupController.getEntityDetails());
cinemaGroupRouters.post("/search", cinemaGroupController.search());


module.exports = cinemaGroupRouters;
