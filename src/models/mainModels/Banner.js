const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Banner",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(50),
      description: DataTypes.STRING,
      url: {
        type: DataTypes.STRING(500),
        unique: "url",
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Invalid Url",
          },
        },
      },
      movieId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "movie_id",
      },
    },
    {
      tableName: "banners",
      timestamps: false,
    }
  );
};
