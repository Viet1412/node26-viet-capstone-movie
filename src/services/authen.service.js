const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const generateToken = require("../helpers/jwt");
const { User } = require("../models");

const authenService = {
  signUp: async (dataSignUp) => {
    try {
      if (!dataSignUp.email.trim() || !dataSignUp.password.trim() || !dataSignUp.account.trim()) {
        throw new AppError(400, "missing required data to sign up");
      }

      const isEmailExists = await User.findOne({ where: { email: dataSignUp.email } });
      if (isEmailExists) {
        throw new AppError(400, "Email already exists");
      }

      const isAccountExists = await User.findOne({ where: { account: dataSignUp.account } });
      if (isAccountExists) {
        throw new AppError(400, "Account already exists");
      }

      dataSignUp.role = "user";
      const createdUser = await User.create(dataSignUp);
      return createdUser;
    } catch (error) {
      throw error;
    }
  },

  logIn: async (credential) => {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email: credential.emailOrAccount },
            { account: credential.emailOrAccount }
          ]
        },
        attributes: { include: ["password"] },
      });
      if (!user) {
        throw new AppError(400, "Email, account or password invalid");
      }

      const isMatched = bcrypt.compareSync(credential.password, user.password);
      if (!isMatched) {
        throw new AppError(400, "Email, account or password invalid");
      }

      return generateToken(user);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = authenService;
