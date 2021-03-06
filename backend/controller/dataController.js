const moment = require("moment");
var sequelize = require("../database/config");
var Data = require("../model/data");

const controllers = {};
sequelize.sync();

controllers.delete = async (req, res) => {
  const { dataId } = req.body;
  const del = await Data.destroy({
    where: { dataId: dataId },
  });
  res.json({ success: true, deleted: del, message: "Deleted successful" });
};

controllers.updateStatus = async (req, res) => {
  const { dataId } = req.params;
  const { dataStatus } = req.body;
  const data = await Data.update(
    {
      dataStatus: dataStatus,
    },
    {
      where: { dataId: dataId },
    }
  )
    .then(function (data) {
      return data;
    })
    .catch(error => {
      return error;
    });
  res.json({ success: true, data: data, message: "Updated successful" });
};

controllers.update = async (req, res) => {
  const { dataId } = req.params;
  const { dataName } = req.body;
  const data = await Data.update(
    {
      dataName: dataName,
    },
    {
      where: { dataId: dataId },
    }
  )
    .then(function (data) {
      return data;
    })
    .catch(error => {
      return error;
    });
  res.json({ success: true, data: data, message: "Updated successful" });
};

controllers.get = async (req, res) => {
  const { dataId } = req.params;
  const data = await Data.findAll({
    where: { dataId: dataId },
  })
    .then(function (data) {
      return data;
    })
    .catch(error => {
      return error;
    });
  res.json({ success: true, data: data });
};

controllers.create = async (req, res) => {
  // create
  const date = new Date();
  const formatDate = moment(date)
    .add(543, "year")
    .format("DD/MM/YYYY, hh:mm:ss");
  console.log(formatDate);
  const data = await Data.create({
    dataName: req.body.dataName,
    dataValue: req.body.dataValue,
    dataStatus: req.body.status,
    dataDate: formatDate,
    date: moment(date).add(543, "year").format("DD/MM/YYYY"),
  })

    .then(function (data) {
      return data;
    })
    .catch(error => {
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
  const date = new Date();
  const formatDate = moment(date).format("DD/MM/YYYY, hh:mm:ss ");
  console.log(formatDate);
  console.log(date);
  const data = await Data.findAll({})
    .then(function (data) {
      return data;
    })
    .catch(error => {
      return error;
    });
  res.json({ success: true, data: data });
};

module.exports = controllers;
