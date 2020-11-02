const Sequelize = require("sequelize");
const db = require("../database/config");

const Account = db.define(
  "User",
  {
    accountId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fName: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = Account;
