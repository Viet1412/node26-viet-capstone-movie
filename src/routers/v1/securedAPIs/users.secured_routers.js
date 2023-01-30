const express = require("express");
const userController = require("../../../controllers/users.controller");
const requiredRole = require("../../../middlewares/requiredRoles");

const userManagementRouters = express.Router();
const userActionRouters = express.Router();

userManagementRouters.get(
  "",
  requiredRole("admin"),
  userController.getUserList()
);
userManagementRouters.post("", requiredRole("admin"), userController.create());
userManagementRouters.delete(
  "/:id",
  requiredRole("admin"),
  userController.delete()
);
userManagementRouters.put("/:id", userController.update());

// userActionRouters.post("/comment/:pictureId", userController.givesComment());

module.exports = { userManagementRouters, userActionRouters };
