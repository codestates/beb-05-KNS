const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/:userID", controller.userinfoGet);

module.exports = router;