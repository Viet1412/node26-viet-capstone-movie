const express = require("express");
const movieController = require("../../../controllers/movies.controller");

const movieRouters = express.Router();

movieRouters.get("", movieController.getMovieList());
movieRouters.get("/movieListPagination", movieController.getMovieListPagination());
movieRouters.get("/:id", movieController.getMovieDetails());
movieRouters.post("/search", movieController.search());

module.exports = movieRouters;
