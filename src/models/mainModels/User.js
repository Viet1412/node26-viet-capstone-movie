const { genSaltSync, hashSync } = require("bcrypt");
const { DataTypes } = require("sequelize");
const { AppError } = require("../../helpers/error");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      account: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "account",
        validate: {
          notEmpty: {
            msg: "Account field cannot be empty",
          },
          len: {
            args: [3, 24],
            msg: "Account length must be between 3 and 24 letters",
          },
          isGoodString: (value) => {
            if (!/^[a-z]+$/i.test(value[0]) || value.includes(" ")) {
              throw new AppError(
                400,
                "Account must start with a letter, and contain no space"
              );
            }
          },
        },
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
        unique: "avatar",
        validate: {
          isUrl: {
            msg: "Invalid Url",
          },
        },
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
