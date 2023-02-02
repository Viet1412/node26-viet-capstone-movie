const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "BookingDetail",
    {
      ticketBookingId: {
        type: DataTypes.BIGINT.UNSIGNED,
        field: "ticket_booking_id",
      },
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
      seatNameId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        field: "seat_name_id",
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "booking_details",
      timestamps: false,
    }
  );
};
