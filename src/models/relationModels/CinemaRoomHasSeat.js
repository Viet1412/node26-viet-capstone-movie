const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "CinemaRoomHasSeat",
    {
      cinemaRoomId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "cinema_room_id",
      },
      seatNameId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        field: "seat_name_id",
      },
      seatType: {
        type: DataTypes.ENUM("normal", "vip", "sweet-box"),
        defaultValue: "normal",
        field: "seat_type",
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "cinema_room_has_seats",
      timestamps: false,
    }
  );
};
