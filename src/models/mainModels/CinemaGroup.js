const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "CinemaGroup",
    {
      id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      cinemaSystemId: {
        type: DataTypes.TINYINT,
        field: "cinema_system_id",
      },
      name: {
        type: DataTypes.STRING(300),
        unique: "name",
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        unique: "image",
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: DataTypes.STRING(50),
      district: DataTypes.STRING(50),
    },
    {
      tableName: "cinema_groups",
      timestamps: false,
    }
  );
};
