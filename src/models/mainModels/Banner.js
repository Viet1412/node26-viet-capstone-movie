const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Banner",
    {
      id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
      },
      description: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
        unique: "url",
        allowNull: false,
      },
      movieId: {
        type: DataTypes.INTEGER,
        field: "movie_id",
      },
    },
    {
      tableName: "banners",
      timestamps: false,
    }
  );
};
