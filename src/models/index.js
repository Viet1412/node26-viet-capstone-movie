const { Sequelize } = require("sequelize");
const configs = require("../config");

const sequelize = new Sequelize(
  configs.DB_NAME,
  configs.DB_USER,
  configs.DB_PASSWORD,
  {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
  }
);

// test connection to database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected Okk");
  } catch (error) {
    console.log("Sequelize Errorrr", error);
  }
})();

// *Initiate Models* //
const User = require("./mainModels/User")(sequelize);
const Movie = require("./mainModels/Movie")(sequelize);
const Banner = require("./mainModels/Banner")(sequelize);
const CinemaSystem = require("./mainModels/CinemaSystem")(sequelize);
const CinemaGroup = require("./mainModels/CinemaGroup")(sequelize);
const CinemaRoom = require("./mainModels/CinemaRoom")(sequelize);
const SeatName = require("./mainModels/SeatName")(sequelize);
const Showtime = require("./mainModels/Showtime")(sequelize);
const CinemaRoomHasSeat = require("./relationModels/CinemaRoomHasSeat")(sequelize);
const CinemaRoomHasMovie = require("./relationModels/CinemaRoomHasMovie")(sequelize);
const TicketBooking = require("./mainModels/TicketBooking")(sequelize);
const BookingDetail = require("./relationModels/BookingDetail")(sequelize);

// *Create Models Relations* //
//User creates TicketBooking
User.hasMany(TicketBooking, { as: "hasTicketBookings", foreignKey: "userId" });
TicketBooking.belongsTo(User, { as: "owner", foreignKey: "userId" });

//Movie has Banner
Movie.hasMany(Banner, { as: "hasBanners", foreignKey: "movieId" });
Banner.belongsTo(Movie, { as: "fromMovie", foreignKey: "movieId" });

//CinemaSystem has CinemaGroup
CinemaSystem.hasMany(CinemaGroup, { as: "hasCinemaGroups", foreignKey: "cinemaSystemId" });
CinemaGroup.belongsTo(CinemaSystem, { as: "owner", foreignKey: "cinemaSystemId" });

//CinemaGroup has CinemaRoom
CinemaGroup.hasMany(CinemaRoom, { as: "hasCinemaRooms", foreignKey: "cinemaGroupId" });
CinemaRoom.belongsTo(CinemaGroup, { as: "inCinemaGroup", foreignKey: "cinemaGroupId" });

//CinemaRoom has Seat
CinemaRoom.belongsToMany(SeatName, {
  as: "hasSeats",
  through: CinemaRoomHasSeat,
  foreignKey: "cinemaRoomId",
});
SeatName.belongsToMany(CinemaRoom, {
  as: "inCinemaRooms",
  through: CinemaRoomHasSeat,
  foreignKey: "seatNameId",
});
CinemaRoomHasSeat.belongsTo(SeatName, { as: "nameOfSeat", foreignKey: "seatNameId" });

//CinemaRoom has Movie
CinemaRoom.belongsToMany(Movie, {
  as: "hasMovies",
  through: CinemaRoomHasMovie,
  foreignKey: "cinemaRoomId",
  otherKey: "movieId",
  uniqueKey: 'CinemaRoomHasMovie_uniqueKey'
});
Movie.belongsToMany(Showtime, {
  as: "movieShowtimes",
  through: CinemaRoomHasMovie,
  foreignKey: "movieId",
  otherKey: "showtimeId",
  uniqueKey: 'CinemaRoomHasMovie_uniqueKey'
});
CinemaRoom.belongsToMany(Showtime, {
  as: "hasShowtimes",
  through: CinemaRoomHasMovie,
  foreignKey: "cinemaRoomId",
  otherKey: "showtimeId",
  uniqueKey: 'CinemaRoomHasMovie_uniqueKey'
});
CinemaRoomHasMovie.belongsTo(Showtime, { as: "showtimeDetails", foreignKey: "showtimeId" });
CinemaRoomHasMovie.belongsTo(Movie, { as: "movieDetails", foreignKey: "movieId" });
CinemaRoomHasMovie.belongsTo(CinemaRoom, { as: "cinemaRoomInfo", foreignKey: "cinemaRoomId" });

//Ticket Booking Details
TicketBooking.hasMany(BookingDetail, { as: "bookingDetails", foreignKey: "ticketBookingId" });
BookingDetail.belongsTo(Movie, { as: "movie", foreignKey: "movieId" });
BookingDetail.belongsTo(Showtime, { as: "showtime", foreignKey: "showtimeId" });
BookingDetail.belongsTo(CinemaRoom, { as: "cinemaRoom", foreignKey: "cinemaRoomId" });
BookingDetail.belongsTo(SeatName, { as: "seat", foreignKey: "seatNameId" });


module.exports = {
  sequelize,
  User,
  Movie,
  Banner,
  CinemaSystem,
  CinemaGroup,
  CinemaRoom,
  SeatName,
  Showtime,
  CinemaRoomHasSeat,
  CinemaRoomHasMovie,
  TicketBooking,
  BookingDetail,
};
