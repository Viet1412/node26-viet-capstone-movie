const express = require("express");
const bannerController = require("../../../controllers/banners.controller");

const bannerManagementRouters = express.Router();

bannerManagementRouters.post("", bannerController.create());
bannerManagementRouters.delete("/:id", bannerController.delete());
bannerManagementRouters.put("/:id", bannerController.update());


module.exports = bannerManagementRouters;
