const express = require("express");
const cinemaSystemController = require("../../../controllers/cinemaSystems.controller");

const cinemaSystemManagementRouters = express.Router();

cinemaSystemManagementRouters.get("", cinemaSystemController.getEntityList());
cinemaSystemManagementRouters.get("", cinemaSystemController.getEntityListPagination());
cinemaSystemManagementRouters.get("/:id", cinemaSystemController.getEntityDetails());
cinemaSystemManagementRouters.post("", cinemaSystemController.create());
cinemaSystemManagementRouters.delete("/:id", cinemaSystemController.delete());
cinemaSystemManagementRouters.put("/:id", cinemaSystemController.update());
cinemaSystemManagementRouters.post("/search", cinemaSystemController.search());


module.exports = cinemaSystemManagementRouters;
