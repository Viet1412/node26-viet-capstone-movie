const express = require("express");
const movieController = require("../../../controllers/movies.controller");

const movieRouters = express.Router();

movieRouters.get("", movieController.getMovieList());
movieRouters.get("/movieListPagination", movieController.getMovieListPagination());
movieRouters.get("/movieListByShowtime", movieController.getMovieListByShowtime());
movieRouters.get("/:id/showtimes", movieController.getShowtimesByMovieId());
movieRouters.get("/:id", movieController.getMovieDetails());
movieRouters.post("/search", movieController.search());

module.exports = movieRouters;
