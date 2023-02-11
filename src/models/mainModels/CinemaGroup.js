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
        type: DataTypes.TINYINT.UNSIGNED,
        field: "cinema_system_id",
      },
      name: {
        type: DataTypes.STRING(300),
        unique: "name",
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(500),
        unique: "image",
        validate: {
          isUrl: {
            msg: "Invalid Url",
          },
        },
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
