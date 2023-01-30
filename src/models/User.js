const { genSaltSync, hashSync } = require("bcrypt");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(50),
        field: "last_name",
      },
      age: {
        type: DataTypes.TINYINT,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "email",
        validate: {
          isEmail: {
            msg: "Invalid Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const salt = genSaltSync();
          const hashedPassword = hashSync(value, salt);
          this.setDataValue("password", hashedPassword);
        },
      },
      avatar: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      hooks: {
        afterSave: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
};
