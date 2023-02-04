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

        const foundMovies = await movieService.search(searchKeyWord, pagination);
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

  // searchPicturesByName: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { pictureName } = req.body;

  //       const pictureList = await pictureService.searchPicturesByName(
  //         pictureName
  //       );
  //       res.status(200).json(respone(pictureList));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // getCommentsOfPicture: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { id } = req.params;

  //       const pictureWithComments = await pictureService.getCommentsOfPicture(
  //         id
  //       );
  //       res.status(200).json(respone(pictureWithComments));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // getSaveStatus: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { pictureId } = req.params;
  //       const { user: requester } = res.locals;

  //       const isSaved = await pictureService.getSaveStatus(
  //         pictureId,
  //         requester
  //       );

  //       res.status(200).json(respone(isSaved));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // create: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const dataNewPictures = req.body;
  //       const { user: requester } = res.locals;

  //       const newPictures = await pictureService.create(
  //         dataNewPictures,
  //         requester
  //       );
  //       res.status(201).json(respone(newPictures));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // delete: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { pictureId } = req.params;
  //       const { user: requester } = res.locals;

  //       const deletedPicture = await pictureService.delete(
  //         pictureId,
  //         requester
  //       );
  //       res
  //         .status(200)
  //         .json(
  //           respone(
  //             `picture <${deletedPicture.name}> with id-${deletedPicture.id} deleted`
  //           )
  //         );
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // update: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { pictureId } = req.params;
  //       const dataUpdatePicture = req.body;
  //       const { user: requester } = res.locals;

  //       const updatedPicture = await pictureService.update(
  //         pictureId,
  //         dataUpdatePicture,
  //         requester
  //       );
  //       res.status(200).json(respone(updatedPicture));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },
};

module.exports = movieController;
