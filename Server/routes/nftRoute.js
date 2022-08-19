const express = require("express");
const router = express.Router();
const controller = require("../controllers/nftController")

router.get("/:userID/post", controller.userNftGet);
router.post("/eth", controller.ethFaucetPost);
router.post("/:userID/send", controller.ethPost);
router.post("/create", controller.nftCreat);
router.get("/:nftID", controller.nftReferGet);
router.post("/:nftID/send", controller.nftSendPost);
router.post("/:nftID/buy", controller.nftBuyPost);

module.exports = router;