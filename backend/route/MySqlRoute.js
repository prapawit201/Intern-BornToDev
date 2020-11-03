const express = require("express");
const router = express.Router();

const dataController = require("../controller/dataController");

router.post("/create/data", dataController.create);
router.get("/list/data", dataController.list);
router.post("/update/data/:dataId", dataController.update);
router.post("/update/status/data/:dataId", dataController.updateStatus);
router.post("/delete/data", dataController.delete);
router.get("/get/data/:dataId", dataController.get);

module.exports = router;
