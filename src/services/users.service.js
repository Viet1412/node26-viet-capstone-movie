const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { User } = require("../models");

const userService = {
  //secured services
  getUserList: async () => {
    try {
      const userList = await User.findAll();
      if (!userList.length) {
        throw new AppError(404, "No user found");
      }

      return userList;
    } catch (error) {
      throw error;
    }
  },

  getUserListPagination: async (pagination) => {
    try {
      const userListPagination = await User.findAll({
        offset: (pagination.page * 1 - 1) * (pagination.quantityPerPage * 1),
        limit: pagination.quantityPerPage * 1,
      });
      if (!userListPagination.length) {
        throw new AppError(404, "No user found");
      }

      return userListPagination;
    } catch (error) {
      throw error;
    }
  },

  getUserDetail: async (userId, requester) => {
    try {
      const user = await User.findByPk(userId /*{include:['bookingHistory']}*/);

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

      const isEmailExists = await User.findOne({
        where: { email: dataSignUp.email },
      });
      if (isEmailExists) {
        throw new AppError(400, "Email already exists");
      }

      const isAccountExists = await User.findOne({
        where: { account: dataSignUp.account },
      });
      if (isAccountExists) {
        throw new AppError(400, "Account already exists");
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

  search: async (searchQuery, pagination) => {
    try {
      const foundUsers = await User.findAll({
        where: {
          [Op.or]: [
            { email: { [Op.like]: `%${searchQuery}%` } },
            { account: { [Op.like]: `%${searchQuery}%` } },
            { firstName: { [Op.like]: `%${searchQuery}%` } },
            { lastName: { [Op.like]: `%${searchQuery}%` } },
          ],
        },
        offset:
          (pagination.page * 1 - 1) * (pagination.quantityPerPage * 1) || 0,
        limit: pagination.quantityPerPage * 1 || 9999,
      });

      return foundUsers;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = userService;
