const express = require("express");
const cinemaRoomHasShowtimeController = require("../../../controllers/cinemaRoomHasShowtimes.controller");

const cinemaRoomHasShowtimeManagementRouters = express.Router();

cinemaRoomHasShowtimeManagementRouters.get("", cinemaRoomHasShowtimeController.getEntityList());
cinemaRoomHasShowtimeManagementRouters.get("/cinemaRoomHasShowtimeListPagination", cinemaRoomHasShowtimeController.getEntityListPagination());
cinemaRoomHasShowtimeManagementRouters.get("/cinemaRoomHasShowtimeDetail", cinemaRoomHasShowtimeController.getEntityDetails());
cinemaRoomHasShowtimeManagementRouters.post("", cinemaRoomHasShowtimeController.create());
cinemaRoomHasShowtimeManagementRouters.delete("/cinemaRoomHasShowtimeDelete", cinemaRoomHasShowtimeController.delete());
cinemaRoomHasShowtimeManagementRouters.put("/cinemaRoomHasShowtimeUpdate", cinemaRoomHasShowtimeController.update());
cinemaRoomHasShowtimeManagementRouters.post("/search", cinemaRoomHasShowtimeController.search());


module.exports = cinemaRoomHasShowtimeManagementRouters;
