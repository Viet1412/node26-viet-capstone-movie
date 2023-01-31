const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "SeatName",
    {
      id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        unique: "name",
      },
    },
    {
      tableName: "seat_names",
      timestamps: false,
    }
  );
};
