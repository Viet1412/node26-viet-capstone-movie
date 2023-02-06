const respone = require("../helpers/response");
const movieService = require("../services/movies.service");

const movieController = {
  //public controller functions
  getMovieList: () => {
    return async (req, res, next) => {
      try {
        const movieList = await movieService.getMovieList();
        res.status(200).json(respone(movieList));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getMovieListPagination: () => {
    return async (req, res, next) => {
      try {
        const pagination = req.query;

        const movieListPagination = await movieService.getMovieListPagination(
          pagination
        );
        res.status(200).json(respone(movieListPagination));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getMovieDetails: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;

        const movieDetails = await movieService.getMovieDetails(id);
        res.status(200).json(respone(movieDetails));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  search: () => {
    return async (req, res, next) => {
      try {
        const { searchKeyWord } = req.body;
        const pagination = req.query;

        const foundMovies = await movieService.search(
          searchKeyWord,
          pagination
        );
        res.status(200).json(respone(foundMovies));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getBannerList: () => {
    return async (req, res, next) => {
      try {
        const bannerList = await movieService.getBannerList();
        res.status(200).json(respone(bannerList));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  //secured controller functions
  create: () => {
    return async (req, res, next) => {
      try {
        const dataNewMovies = req.body;
        const { user: requester } = res.locals;

        const newMovies = await movieService.create(dataNewMovies, requester);
        res.status(201).json(respone(newMovies));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  delete: () => {
    return async (req, res, next) => {
      try {
        const { movieId } = req.params;

        const deletedMovie = await movieService.delete(movieId);
        res
          .status(200)
          .json(
            respone(
              `Movie <${deletedMovie.name}> with id-${deletedMovie.id} deleted`
            )
          );
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  update: () => {
    return async (req, res, next) => {
      try {
        const { movieId } = req.params;
        const dataUpdateMovie = req.body;

        const updatedMovie = await movieService.update(
          movieId,
          dataUpdateMovie
        );
        res.status(200).json(respone(updatedMovie));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },
};

module.exports = movieController;
