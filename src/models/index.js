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

//Initiate Models
const User = require("./mainModels/User")(sequelize);
const Movie = require("./mainModels/Movie")(sequelize);
const Banner = require("./mainModels/Banner")(sequelize);
const CinemaSystem = require("./mainModels/CinemaSystem")(sequelize);
const CinemaGroup = require("./mainModels/CinemaGroup")(sequelize);
const CinemaRoom = require("./mainModels/CinemaRoom")(sequelize);
const SeatName = require("./mainModels/SeatName")(sequelize);
const Showtime = require("./mainModels/Showtime")(sequelize);
const CinemaRoomHasSeat = require("./relationModels/CinemaRoomHasSeat")(sequelize);
const TicketBooking = require("./mainModels/TicketBooking")(sequelize);

// //Create Relations
// //User creates Pictures
// User.hasMany(Picture, { as: "ownPictures", foreignKey: "ownerId" });
// Picture.belongsTo(User, { as: "owner", foreignKey: "ownerId" });


// //User gives comments to Picture
// User.belongsToMany(Picture, {
//   as: "givesComments",
//   through: Comment,
//   foreignKey: "userId",
// });
// Picture.belongsToMany(User, {
//   as: "hasCommentsFromUsers",
//   through: Comment,
//   foreignKey: "pictureId",
// });


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
  TicketBooking,
};
