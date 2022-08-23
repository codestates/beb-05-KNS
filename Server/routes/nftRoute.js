const express = require("express");
const router = express.Router();
const controller = require("../controllers/nftController");


router.post("/nft", controller.createNFT);
router.get("/nft/:nftId", controller.getNFTById);
router.get("/nft", controller.getAllNFT);
router.put("/nft/:nftId/transfer", controller.transferNFT);
router.put("/nft/:nftId/buy", controller.buyNFT);

module.exports = router;