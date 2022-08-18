const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainController");

router.get("/", controller.mainGet);

module.exports = router;