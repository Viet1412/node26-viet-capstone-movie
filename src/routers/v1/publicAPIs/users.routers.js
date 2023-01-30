const express = require("express");
const userController = require("../../../controllers/users.controller");

const userRouters = express.Router();

userRouters.get("/:id", userController.getUserDetail());


module.exports = userRouters;
