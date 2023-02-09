const express = require("express");
const seatNameController = require("../../../controllers/seatNames.controller");

const seatNameManagementRouters = express.Router();

seatNameManagementRouters.get("", seatNameController.getSeatNameList());
seatNameManagementRouters.get("/seatNameListPagination", seatNameController.getSeatNameListPagination());
seatNameManagementRouters.get("/:seatNameId", seatNameController.getSeatNameDetails());
seatNameManagementRouters.post("", seatNameController.create());
seatNameManagementRouters.delete("/:seatNameId", seatNameController.delete());
seatNameManagementRouters.put("/:seatNameId", seatNameController.update());
seatNameManagementRouters.post("/search", seatNameController.search());


module.exports = seatNameManagementRouters;
