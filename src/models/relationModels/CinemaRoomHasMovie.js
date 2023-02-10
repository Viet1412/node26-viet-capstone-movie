const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "CinemaRoomHasMovie",
    {
      cinemaRoomId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "cinema_room_id",
      },
      movieId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "movie_id",
      },
      showtimeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "showtime_id",
      },
      showStatus: {
        type: DataTypes.ENUM("showing", "coming-soon"),
        defaultValue: "showing",
        field: "show_status",
      },
      seatBooked: {
        type: DataTypes.JSON,
        defaultValue: "[]",
        field: "seat_booked",
        set(value) { this.setDataValue('seatBooked', JSON.stringify(value)) }, //test if this works
        get(value) { this.getDataValue('seatBooked', JSON.parse(value)) }, //test if this works
      },
    },
    {
      tableName: "cinema_room_has_movies",
      timestamps: false,
    }
  );
};
/** when booking, update 3 tables, column seat_booked of this table may be updated by creating a blank [] to push data query from table booking_details, and then convert JSON to update in this table
 * when querying the booked_seat_list, convert JSON data from column seat_booked and check with data from seat_list
 */
