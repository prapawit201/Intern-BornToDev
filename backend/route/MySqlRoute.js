const express = require("express");
const router = express.Router();

const accountController = require("../controller/accountController");

router.post("/create/account", accountController.create);
router.get("/list/account", accountController.list);
router.post("/update/account/:accountId", accountController.update);
router.post("/delete/account", accountController.delete);
router.get("/get/account/:accountId", accountController.get);

module.exports = router;
