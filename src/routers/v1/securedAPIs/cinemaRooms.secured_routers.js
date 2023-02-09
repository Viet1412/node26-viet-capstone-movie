const express = require("express");
const cinemaRoomController = require("../../../controllers/cinemaRooms.controller");

const cinemaRoomManagementRouters = express.Router();

cinemaRoomManagementRouters.get("", cinemaRoomController.getEntityList());
cinemaRoomManagementRouters.get("/cinemaRoomListPagination", cinemaRoomController.getEntityListPagination());
cinemaRoomManagementRouters.get("/:id", cinemaRoomController.getEntityDetails());
cinemaRoomManagementRouters.post("", cinemaRoomController.create());
cinemaRoomManagementRouters.delete("/:id", cinemaRoomController.delete());
cinemaRoomManagementRouters.put("/:id", cinemaRoomController.update());
cinemaRoomManagementRouters.post("/search", cinemaRoomController.search());


module.exports = cinemaRoomManagementRouters;
