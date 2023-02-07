const express = require("express");
const seatNameController = require("../../../controllers/seatNames.controller");

const seatNameManagementRouters = express.Router();

seatNameManagementRouters.post("", seatNameController.create());
seatNameManagementRouters.delete("/:seatNameId", seatNameController.delete());
seatNameManagementRouters.put("/:seatNameId", seatNameController.update());

module.exports = seatNameManagementRouters;
