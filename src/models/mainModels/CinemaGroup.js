const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "CinemaGroup",
    {
      id: {
        type: DataTypes.SMALLINT,
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
      city: {
        type: DataTypes.STRING(50),
      },
      district: {
        type: DataTypes.STRING(50),
      },
    },
    {
      tableName: "cinema_groups",
      timestamps: false,
    }
  );
};
