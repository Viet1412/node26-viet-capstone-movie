const respone = require("../helpers/response");
const authenService = require("../services/authen.service");

require("dotenv").config();

const authenController = {
  signUp: () => {
    return async (req, res, next) => {
      try {
        dataSignUp = req.body;
        const createdUser = await authenService.signUp(dataSignUp);
        res.status(200).json(respone(createdUser));
      } catch (error) {
        console.error("-------->", error);
        next(error);
      }
    };
  },

  logIn: () => {
    return async (req, res, next) => {
      try {
        const credential = req.body;
        const user = await authenService.logIn(credential);

        res.status(200).json(respone(user));
      } catch (error) {
        console.error("-------->", error);
        next(error);
      }
    };
  },
};

module.exports = authenController;
