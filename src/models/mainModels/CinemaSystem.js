const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "CinemaSystem",
    {
      id: {
        type: DataTypes.TINYINT.UNSIGNED,
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
        validate: {
          isUrl: {
            msg: "Invalid Url",
          },
        },
      },
      logo: {
        type: DataTypes.STRING(500),
        unique: "logo",
        validate: {
          isUrl: {
            msg: "Invalid Url",
          },
        },
      },
    },
    {
      tableName: "cinema_systems",
      timestamps: false,
    }
  );
};
