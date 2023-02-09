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
const SeatName = require("./mainModels/SeatName")(sequelize);
const CinemaSystem = require("./mainModels/CinemaSystem")(sequelize);
const CinemaGroup = require("./mainModels/CinemaGroup")(sequelize);
const TicketBooking = require("./mainModels/TicketBooking")(sequelize);

// //Create Relations
// //User creates Pictures
// User.hasMany(Picture, { as: "ownPictures", foreignKey: "ownerId" });
// Picture.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

// //Picture has comments
// Picture.hasMany(Comment, { as: "hasComments", foreignKey: "pictureId" });
// Comment.belongsTo(Picture, { as: "onPicture", foreignKey: "pictureId" });

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

// //User saves Picture
// User.belongsToMany(Picture, {
//   as: "savesPictures",
//   through: SavePicture,
//   foreignKey: "userId",
// });
// Picture.belongsToMany(User, {
//   as: "savedByUsers",
//   through: SavePicture,
//   foreignKey: "pictureId",
// });

module.exports = {
  sequelize,
  User,
  Movie,
  Banner,
  SeatName,
  CinemaSystem,
  CinemaGroup,
  TicketBooking,
};
