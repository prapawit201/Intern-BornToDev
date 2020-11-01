const Sequelize = require("sequelize");
const db = require("../database/config");

const Account = db.define(
  "Account",
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
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = Account;
