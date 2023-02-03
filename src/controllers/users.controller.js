const respone = require("../helpers/response");
const userService = require("../services/users.service");

const userController = {
  // secured controller functions
  getUserList: () => {
    return async (req, res, next) => {
      try {
        const userList = await userService.getUserList();
        res.status(200).json(respone(userList));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getUserListPagination: () => {
    return async (req, res, next) => {
      try {
        const pagination = req.query;

        const userListPagination = await userService.getUserListPagination(
          pagination
        );
        res.status(200).json(respone(userListPagination));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getUserDetail: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;
        const { user: requester } = res.locals;

        const user = await userService.getUserDetail(id, requester);
        res.status(200).json(respone(user));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  create: () => {
    return async (req, res, next) => {
      try {
        const dataNewUser = req.body;
        const newUser = await userService.create(dataNewUser);
        res.status(201).json(respone(newUser));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  delete: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;

        const user = await userService.delete(id);
        res
          .status(200)
          .json(respone(`User <${user.firstName}> with id-${user.id} deleted`));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  update: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;
        const dataUpdateUser = req.body;
        const { user: requester } = res.locals;

        const updatedUser = await userService.update(
          id,
          dataUpdateUser,
          requester
        );
        res.status(200).json(respone(updatedUser));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  search: () => {
    return async (req, res, next) => {
      try {
        const { searchQuery } = req.body;
        const pagination = req.query;

        const foundUsers = await userService.search(searchQuery, pagination);
        res.status(200).json(respone(foundUsers));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },
};

module.exports = userController;
