const express = require("express");
const configs = require("./config");
const { handleErrors } = require("./helpers/error");
const { sequelize } = require("./models");
const v1 = require("./routers/v1");

const app = express();
app.use(express.json());
app.use(express.static("."))

sequelize.sync({alter: true})

app.use("/api/v1", v1);

app.use(handleErrors)

app.listen(configs.PORT);

// // Call these functions to generate testing data. Disable relation models and recreate tables before generating data.
const generateDataToTest = require("./helpers/generateDataToTest");
// generateDataToTest.users();
// generateDataToTest.pictures()
// generateDataToTest.comments()
