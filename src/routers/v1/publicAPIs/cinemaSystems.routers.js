const express = require("express");
const cinemaSystemController = require("../../../controllers/cinemaSystems.controller");

const cinemaSystemRouters = express.Router();

cinemaSystemRouters.get("", cinemaSystemController.getEntityList());
cinemaSystemRouters.get("/cinemaSystemListPagination", cinemaSystemController.getEntityListPagination());
cinemaSystemRouters.get("/hasCinemaGroups", cinemaSystemController.getCinemaGroupsOfCinemaSystems());
cinemaSystemRouters.get("/hasShowtimes", cinemaSystemController.getShowtimesOfCinemaSystems());
cinemaSystemRouters.get("/:id/hasCinemaGroups", cinemaSystemController.getCinemaGroupsOfCinemaSystem());
cinemaSystemRouters.get("/:id", cinemaSystemController.getEntityDetails());
cinemaSystemRouters.post("/search", cinemaSystemController.search());



module.exports = cinemaSystemRouters;
