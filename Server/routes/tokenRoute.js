const express = require("express");
const router = express.Router();
const controller = require("../controllers/tokenController");

router.get("/", controller.erc20Get);
router.post("/:userID", controller.erc20Post);

module.exports = router;