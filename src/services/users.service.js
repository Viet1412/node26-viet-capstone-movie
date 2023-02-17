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
      const page = pagination.page * 1;
      const quantityPerPage = pagination.quantityPerPage * 1;

      if (!page || page <= 0 || !quantityPerPage || quantityPerPage <= 0) {
        throw new AppError(404, "Pagination value must be larger than 0");
      }

      const userListPagination = await User.findAndCountAll({
        offset: (page - 1) * quantityPerPage,
        limit: quantityPerPage,
      });
      const { count, rows } = userListPagination;

      if (!count) {
        throw new AppError(404, "No user found");
      }

      return {
        totalRecords: count,
        totalPages: Math.ceil(count / quantityPerPage),
        currentPage: page,
        quantityPerPage: quantityPerPage,
        userListPagination: rows.length ? rows : "Found no other users",
      };
    } catch (error) {
      throw error;
    }
  },

  getUserDetail: async (userId, requester) => {
    try {
      const user = await User.findByPk(userId, {
        include: [
          {
            association: "hasTicketBookings",
            attributes: {
              exclude: ["userId"],
            },
          },
        ],
      });

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

  search: async (searchKeyWord, pagination) => {
    //make search service capable of being used with or without Pagination
    try {
      const page = pagination.page * 1;
      const quantityPerPage = pagination.quantityPerPage * 1;

      //check if user sends an invalid pagination value
      const offsetValue = page > 0 && (page - 1) * quantityPerPage;

      const foundUsers = await User.findAndCountAll({
        where: {
          [Op.or]: [
            { email: { [Op.like]: `%${searchKeyWord}%` } },
            { account: { [Op.like]: `%${searchKeyWord}%` } },
            { firstName: { [Op.like]: `%${searchKeyWord}%` } },
            { lastName: { [Op.like]: `%${searchKeyWord}%` } },
          ],
        },
        offset: offsetValue > 0 ? offsetValue : 0,
        limit: quantityPerPage > 0 ? quantityPerPage : 9999,
      });

      const { count, rows } = foundUsers;

      if (!count) {
        throw new AppError(404, "No user found");
      }

      if (!page || page <= 0 || !quantityPerPage || quantityPerPage <= 0) {
        return rows;
      }

      return {
        totalRecordsFound: count,
        totalPages: Math.ceil(count / quantityPerPage),
        currentPage: page,
        quantityPerPage: quantityPerPage,
        userListPagination: rows.length ? rows : "Found no other users",
      };
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
      const user = await User.findByPk(userId, {
        include: [
          {
            association: "hasTicketBookings",
            attributes: {
              exclude: ["userId"],
            },
          },
        ],
      });
      if (!user) {
        throw new AppError(404, "User not found");
      }

      if (!user.hasTicketBookings.length) {
        throw new AppError(
          400,
          "This user has ticket_bookings available, should not delete or connected data will be lost"
        );
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
};

module.exports = userService;
