const { AppError } = require("../helpers/error");
const { User } = require("../models");

const userService = {
  //secured services
  getUserList: async () => {
    try {
      const userList = await User.findAll();
      if (!userList.length) {
        throw new AppError(404, "no user found");
      }

      return userList;
    } catch (error) {
      throw error;
    }
  },

  getUserDetail: async (userId, requester) => {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw new AppError(404, "User not found");
      }

      if (requester.role !== "admin" && requester.id !== user.id) {
        throw new AppError(403, "Not permitted");
      }

      return user;
    } catch (error) {
      throw error;
    }
  },

  create: async (dataNewUser) => {
    try {
      if (Object.keys(dataNewUser).length == 0) {
        throw new AppError(400, "Data cannot be empty");
      }

      const user = await User.findOne({ where: { email: dataNewUser.email } });
      if (user) {
        throw new AppError(400, "Email already exists");
      }

      //auto generate a random password if admin does not enter any value for password
      if (!dataNewUser.password) {
        dataNewUser.password = Math.random().toString(36).substring(5);
      }

      const newUser = await User.create(dataNewUser);

      //return this password to admin or email it to user and ask user to change password
      newUser.dataValues.passwordOfNewUserCreatedByAdmin = dataNewUser.password;

      return newUser;
    } catch (error) {
      throw error;
    }
  },

  delete: async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new AppError(404, "User not found");
      }

      await User.destroy({ where: { id: userId } });

      return user;
    } catch (error) {
      throw error;
    }
  },

  update: async (userId, dataUpdateUser, requester) => {
    try {
      if (Object.keys(dataUpdateUser).length == 0) {
        throw new AppError(400, "Nothing to update");
      }

      const user = await User.findByPk(userId);
      if (!user) {
        throw new AppError(404, "User not found");
      }

      if (requester.role !== "admin" && requester.id !== user.id) {
        throw new AppError(403, "Not permitted");
      }

      if (dataUpdateUser.role !== user.role && requester.role !== "admin") {
        throw new AppError(403, "Only admin can change role");
      }

      if (dataUpdateUser.email !== user.email) {
        const isEmailExists = await User.findOne({
          where: { email: dataUpdateUser.email },
        });
        if (isEmailExists) {
          throw new AppError(400, "Email already exists");
        }
      }

      //keep id unchanged
      dataUpdateUser.id = userId;

      await User.update(dataUpdateUser, {
        where: { id: userId },
      });

      return await User.findByPk(userId);
    } catch (error) {
      throw error;
    }
  },

  // givesComment: async (pictureId, commentContent, requester) => {
  //   try {
  //     if (!commentContent.trim()) {
  //       throw new AppError(400, "not enough word to make a comment");
  //     }

  //     const picture = await Picture.findByPk(pictureId);
  //     if (!picture) {
  //       throw new AppError(404, "Picture not found");
  //     }

  //     const newComment = await Comment.create({
  //       userId: requester.id,
  //       pictureId: picture.id,
  //       content: commentContent,
  //     });

  //     return newComment;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // savesPicture: async (pictureId, requester) => {
  //   try {
  //     const picture = await Picture.findByPk(pictureId);
  //     if (!picture) {
  //       throw new AppError(404, "Picture not found");
  //     }

  //     //sequelize may have bug in this case
  //     // const isSaved = await requester.hasSavesPicture(pictureId);

  //     const isSaved = await picture.hasSavedByUser(requester.id);

  //     if (isSaved) {
  //       await requester.removeSavesPicture(pictureId);
  //       return "unsaved";
  //     } else {
  //       await requester.addSavesPicture(pictureId);
  //       return "saved";
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};

module.exports = userService;
