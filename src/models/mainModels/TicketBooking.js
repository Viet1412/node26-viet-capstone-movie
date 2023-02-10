const { DataTypes } = require("sequelize");
// const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "TicketBooking",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "user_id",
      },
      totalTicket: {
        type: DataTypes.SMALLINT(3).ZEROFILL,//the number of seat in a cinema room often below 600
        field: "total_ticket",
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10,2),
        field: "total_price",
      },
      // createdAt: {
      //   type: DataTypes.DATE,
      //   field: "created_at",
      //   defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      // },
    },
    {
      tableName: "ticket_bookings",
      timestamps: true,
      createdAt: "booking_time",
      updatedAt: false
    }
  );
};
