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
        type: DataTypes.STRING,
        unique: "poster",
      },
      trailer: {
        type: DataTypes.STRING,
        unique: "trailer",
      },
      director: DataTypes.STRING(100),
      description: DataTypes.STRING,
      duration: DataTypes.SMALLINT(3), //the duration of a movie often shorter than 200 minutes
      rating: DataTypes.TINYINT,
      ageRate: {
        type: DataTypes.ENUM("G", "PG", "PG-13", "R"),
        defaultValue: "G",
        field: "age_rate",
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
