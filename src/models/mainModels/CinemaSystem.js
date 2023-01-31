const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "CinemaSystem",
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
      website: {
        type: DataTypes.STRING,
        unique: "website",
      },
      logo: {
        type: DataTypes.STRING,
        unique: "logo",
      },
    },
    {
      tableName: "cinema_systems",
      timestamps: false,
    }
  );
};
