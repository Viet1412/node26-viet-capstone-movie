const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "CinemaRoom",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      cinemaGroupId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        field: "cinema_group_id",
      },
      name: {
        type: DataTypes.STRING(50),
      },
      type: {
        type: DataTypes.ENUM("2D", "3D", "4D", "I-Max"),
        defaultValue: "2D",
      },
      operationStatus: {
        type: DataTypes.ENUM("opened", "closed", "repairing"),
        defaultValue: "opened",
        field: "operation_status",
      },
    },
    {
      tableName: "cinema_rooms",
      timestamps: false,
    }
  );
};
