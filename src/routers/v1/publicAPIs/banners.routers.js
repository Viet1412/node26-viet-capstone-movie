const express = require("express");
const bannerController = require("../../../controllers/banners.controller");

const bannerRouters = express.Router();

bannerRouters.get("", bannerController.getEntityList());
bannerRouters.get("/bannerListPagination", bannerController.getEntityListPagination());
bannerRouters.get("/:id", bannerController.getEntityDetails());
bannerRouters.post("/search", bannerController.search());


module.exports = bannerRouters;
