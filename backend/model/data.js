const Sequelize = require("sequelize");
const db = require("../database/config");

const Account = db.define(
  "Data",
  {
    dataId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    dataName: {
      type: Sequelize.STRING,
    },
    dataValue: {
      type: Sequelize.STRING,
    },
    
    dataStatus: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = Account;
