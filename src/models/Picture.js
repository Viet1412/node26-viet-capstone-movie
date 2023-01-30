const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Picture",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "url",
      },
      description: {
        type: DataTypes.STRING,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        field: "owner_id",
      },
    },
    {
      tableName: "pictures",
      timestamps: false,
    }
  );
};
