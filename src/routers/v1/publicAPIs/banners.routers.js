const express = require("express");
const bannerController = require("../../../controllers/banners.controller");

const bannerRouters = express.Router();

bannerRouters.get("", bannerController.getbannerList());
bannerRouters.get("/bannerListPagination", bannerController.getbannerListPagination());
bannerRouters.get("/:id", bannerController.getbannerDetails());
bannerRouters.post("/search", bannerController.search());


module.exports = bannerRouters;
