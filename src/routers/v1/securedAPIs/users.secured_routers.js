const express = require("express");
const userController = require("../../../controllers/users.controller");
const requiredRole = require("../../../middlewares/requiredRoles");

const userManagementRouters = express.Router();

//only admin access
userManagementRouters.get("", requiredRole("admin"), userController.getUserList());
userManagementRouters.post("", requiredRole("admin"), userController.create());
userManagementRouters.delete("/:id", requiredRole("admin"), userController.delete());

//admin & account owner access
userManagementRouters.get("/:id", userController.getUserDetail());
userManagementRouters.put("/:id", userController.update());


// const userActionRouters = express.Router();
// userActionRouters.post("/comment/:pictureId", userController.givesComment());

module.exports = { userManagementRouters, userActionRouters };
