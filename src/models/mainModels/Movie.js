const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Movie",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(200),
      },
      poster: {
        type: DataTypes.STRING,
        unique: "poster",
      },
      trailer: {
        type: DataTypes.STRING,
        unique: "trailer",
      },
      director: {
        type: DataTypes.STRING(100),
      },
      description: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.SMALLINT(3),//the duration of a movie often shorter than 200 minutes
      },
      rating: {
        type: DataTypes.TINYINT,
      },
      ageRate: {
        type: DataTypes.ENUM("G", "PG", "PG-13", "R"),
        defaultValue: "G",
        field: "age_rate",
      },
      hotStatus: {
        type: DataTypes.BOOLEAN,
        field: "hot_status",
      },
    },
    {
      tableName: "movies",
      timestamps: false,
    }
  );
};
