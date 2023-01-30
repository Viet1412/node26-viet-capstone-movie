const jwt = require("jsonwebtoken");
const configs = require("../config");
const { AppError } = require("../helpers/error");
const { User } = require("../models");

const extractTokenFromHeader = (headers) => {
  const bearerToken = headers.authorization;
  const partsOfBearerToken = bearerToken.split(" ");
  if (
    partsOfBearerToken.length !== 2 ||
    partsOfBearerToken[0] !== "Bearer" ||
    !partsOfBearerToken[1].trim()
  ) {
    throw new AppError(401, "Invalid token");
  }

  return partsOfBearerToken[1];
};

const authorization = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers);
    const payload = jwt.verify(token, configs.SECRET_KEY);

    const user = await User.findByPk(payload.id);
    if (!user) {
      throw new AppError(401, "Invalid token");
    }

    //save user-info to local to use in functions after next()
    res.locals.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, "Invalid token"));
    }

    next(error);
  }
};

module.exports = authorization;
