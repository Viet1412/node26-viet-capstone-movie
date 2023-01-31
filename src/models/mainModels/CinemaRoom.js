const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "CinemaRoom",
    {
      id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true,
      },
      cinemaGroupId: {
        type: DataTypes.SMALLINT,
        field: "cinema_group_id",
      },
      name: {
        type: DataTypes.STRING(50),
        unique: "name",
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
