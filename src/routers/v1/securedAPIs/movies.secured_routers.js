const express = require("express");
const movieController = require("../../../controllers/movies.controller");

const movieManagementRouters = express.Router();

movieManagementRouters.post("", movieController.create());
movieManagementRouters.delete("/:movieId", movieController.delete());
movieManagementRouters.put("/:movieId", movieController.update());

module.exports = movieManagementRouters;
