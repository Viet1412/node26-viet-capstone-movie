const express = require("express");
const pictureController = require("../../../controllers/pictures.controller");

const pictureManagementRouters = express.Router();

pictureManagementRouters.post("", pictureController.create());
pictureManagementRouters.delete("/:pictureId", pictureController.delete());
pictureManagementRouters.put("/:pictureId", pictureController.update());
pictureManagementRouters.get(
  "/saveStatus/:pictureId",
  pictureController.getSaveStatus()
);

module.exports = pictureManagementRouters;
