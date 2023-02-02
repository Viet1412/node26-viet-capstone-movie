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
      year: DataTypes.SMALLINT(4).UNSIGNED,
      month: DataTypes.TINYINT(2).UNSIGNED.ZEROFILL,
      day: DataTypes.TINYINT(2).UNSIGNED.ZEROFILL,
      hour: DataTypes.TINYINT(2).UNSIGNED.ZEROFILL,
      minute: DataTypes.TINYINT(2).UNSIGNED.ZEROFILL,
    },
    {
      tableName: "showtimes",
      timestamps: false,
    }
  );
};
