const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "CinemaRoomHasMovie",
    {
      cinemaRoomId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "cinema_room_id",
        primaryKey: true,
      },
      movieId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "movie_id",
        primaryKey: true,
      },
      showtimeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "showtime_id",
        primaryKey: true,
      },
      showStatus: {
        type: DataTypes.ENUM("showing", "coming-soon"),
        defaultValue: "showing",
        field: "show_status",
      },
      seatBooked: {
        type: DataTypes.JSON,
        field: "seat_booked",
        defaultValue: [],
      },
    },
    {
      tableName: "cinema_room_has_movies",
      timestamps: false,
    }
  );
};
