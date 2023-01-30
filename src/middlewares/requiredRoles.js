const { AppError } = require("../helpers/error");

const requiredRole = (...roles) => {
  return (req, res, next) => {
    const { user } = res.locals;

    const isMatched = roles.includes(user.role);
    if (!isMatched) {
      next(new AppError(403, "Not permitted"));
      return;
    }

    next();
  };
};

module.exports = requiredRole;
