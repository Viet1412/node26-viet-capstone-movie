const express = require("express");
const cinemaSystemController = require("../../../controllers/cinemaSystems.controller");

const cinemaSystemManagementRouters = express.Router();

cinemaSystemManagementRouters.post("", cinemaSystemController.create());
cinemaSystemManagementRouters.delete("/:id", cinemaSystemController.delete());
cinemaSystemManagementRouters.put("/:id", cinemaSystemController.update());

module.exports = cinemaSystemManagementRouters;
