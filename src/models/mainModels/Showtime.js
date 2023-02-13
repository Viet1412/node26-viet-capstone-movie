const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Showtime",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      date: DataTypes.DATEONLY,
      dateTime: {
        type: 'TIMESTAMP',
        unique: "dateTime",
        field: "date_time",
      },
    },
    {
      tableName: "showtimes",
      timestamps: false,
    }
  );
};
