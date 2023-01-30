const respone = require("../helpers/response");
const userService = require("../services/users.service");

const userController = {
  //public controller functions
  getUserDetail: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;

        const user = await userService.getUserDetail(id);
        res.status(200).json(respone(user));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  // getUserOwnPictures: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { id } = req.params;

  //       const userWithOwnPictures = await userService.getUserOwnPictures(id);
  //       res.status(200).json(respone(userWithOwnPictures));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // getUserSavedPictures: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { id } = req.params;

  //       const userWithSavedPictures = await userService.getUserSavedPictures(
  //         id
  //       );
  //       res.status(200).json(respone(userWithSavedPictures));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // //secured controller functions
  // getUserList: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const userList = await userService.getUserList();
  //       res.status(200).json(respone(userList));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // create: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const dataNewUser = req.body;
  //       const newUser = await userService.create(dataNewUser);
  //       res.status(201).json(respone(newUser));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // delete: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { id } = req.params;

  //       const user = await userService.delete(id);
  //       res
  //         .status(200)
  //         .json(respone(`User <${user.firstName}> with id-${user.id} deleted`));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // update: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { id } = req.params;
  //       const dataUpdateUser = req.body;
  //       const { user } = res.locals;

  //       const updatedUser = await userService.update(id, dataUpdateUser, user);
  //       res.status(200).json(respone(updatedUser));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // givesComment: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { pictureId } = req.params;
  //       const { commentContent } = req.body;
  //       const { user: requester } = res.locals;

  //       const newComment = await userService.givesComment(
  //         pictureId,
  //         commentContent,
  //         requester
  //       );
  //       res.status(200).json(respone(newComment));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // savesPicture: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { pictureId } = req.params;
  //       const { user: requester } = res.locals;

  //       const isSaved = await userService.savesPicture(pictureId, requester);

  //       res.status(200).json(respone(isSaved));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },
};

module.exports = userController;
