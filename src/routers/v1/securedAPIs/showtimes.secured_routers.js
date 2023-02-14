const express = require("express");
const showtimeController = require("../../../controllers/showtimes.controller");

const showtimeManagementRouters = express.Router();

showtimeManagementRouters.get("", showtimeController.getEntityList());
showtimeManagementRouters.get("/showtimeListPagination", showtimeController.getEntityListPagination());
showtimeManagementRouters.get("/:id", showtimeController.getEntityDetails());
showtimeManagementRouters.post("", showtimeController.create());
showtimeManagementRouters.delete("/:id", showtimeController.delete());
showtimeManagementRouters.put("/:id", showtimeController.update());
showtimeManagementRouters.post("/search", showtimeController.search());


module.exports = showtimeManagementRouters;
