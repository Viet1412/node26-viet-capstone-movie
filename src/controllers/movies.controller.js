const respone = require("../helpers/response");
const movieService = require("../services/movies.service");

const movieController = {
  //public controller functions
  getPictureList: () => {
    return async (req, res, next) => {
      try {
        const pictureList = await pictureService.getPictureList();
        res.status(200).json(respone(pictureList));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

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

  // getPictureDetails: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { id } = req.params;

  //       const pictureDetails = await pictureService.getPictureDetails(id);
  //       res.status(200).json(respone(pictureDetails));
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

  // //secured controller functions
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
