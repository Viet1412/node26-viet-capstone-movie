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


// Call these functions to generate testing data. If errors happen, should disable relations between models and recreate tables before generating data.
const generateDataToTest = require("./helpers/generateDataToTest");
// generateDataToTest.users();
// generateDataToTest.movies()
// generateDataToTest.cinemaSystems()
// generateDataToTest.cinemaGroups()
// generateDataToTest.cinemaRooms()
// generateDataToTest.seatNames()
// generateDataToTest.showtimes()
// generateDataToTest.cinemaRoomHasSeats()
// generateDataToTest.cinemaRoomHasMovies()
// generateDataToTest.banners()
// generateDataToTest.ticketBookings()
