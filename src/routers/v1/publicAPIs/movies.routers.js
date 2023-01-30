const express = require("express");
const movieController = require("../../../controllers/movies.controller");

const movieRouters = express.Router();

movieRouters.get("", movieController.getMovieList());
// movieRouters.post("", movieController.searchPicturesByName());
// movieRouters.get("/details/:id", movieController.getPictureDetails());
// movieRouters.get(
//   "/details/:id/comments",
//   movieController.getCommentsOfPicture()
// );

module.exports = movieRouters;
