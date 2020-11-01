var sequelize = require("../database/config");
var Account = require("../model/account");

const controllers = {};
sequelize.sync();

controllers.delete = async (req, res) => {
  const { accountId } = req.body;
  const del = await Account.destroy({
    where: { accountId: accountId },
  });
  res.json({ success: true, deleted: del, message: "Deleted successful" });
};

controllers.update = async (req, res) => {
  const { accountId } = req.params;
  const { fName } = req.body;
  const data = await Account.update(
    {
      fName: fName,
    },
    {
      where: { accountId: accountId },
    }
  )
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data, message: "Updated successful" });
};

controllers.get = async (req, res) => {
  const { accountId } = req.params;
  const data = await Account.findAll({
    where: { accountId: accountId },
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

controllers.create = async (req, res) => {
  // create
  const data = await Account.create({
    fName: req.body.fName,
  })

    .then(function (data) {
      return data;
    })
    .catch((error) => {
      console.log("Error " + error);
      return error;
    });
  // return res
  res.status(200).json({
    success: true,
    message: "Create Success",
    data: data,
  });
};

controllers.list = async (req, res) => {
  const data = await Account.findAll({})
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });

  // console.log(data);
  res.json({ success: true, data: data });
};

module.exports = controllers;
