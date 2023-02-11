const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Movie",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(200),
      poster: {
        type: DataTypes.STRING(500),
        unique: "poster",
        validate: {
          isUrl: {
            msg: "Invalid Url",
          },
        },
      },
      trailer: {
        type: DataTypes.STRING(500),
        unique: "trailer",
        validate: {
          isUrl: {
            msg: "Invalid Url",
          },
        },
      },
      director: DataTypes.STRING(100),
      desc: DataTypes.STRING,
      description: DataTypes.TEXT('medium'),
      duration: DataTypes.SMALLINT(3), //the duration of a movie often shorter than 200 minutes
      rating: DataTypes.TINYINT,
      ageRate: {
        type: DataTypes.ENUM("G", "PG", "PG-13", "R"),
        defaultValue: "G",
        field: "age_rate",
      },
      inCinemaStatus: {
        type: DataTypes.BOOLEAN,
        field: "in_cinema_status",
      },
      hotStatus: {
        type: DataTypes.BOOLEAN,
        field: "hot_status",
      },
      adminId: {
        type: DataTypes.INTEGER,
        field: "admin_id",
      },
    },
    {
      tableName: "movies",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["adminId"],
        },
      },
    }
  );
};
