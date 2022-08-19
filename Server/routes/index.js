const express = require("express");
const router = express.Router();

const main = require("./mainRoute");
const post = require("./postRoute");
const user = require("./userRoute");
const nft = require("./nftRoute");
const auth = require("./authRoute");
const token = require("./tokenRoute");

router.use("/", main);
router.use("/post", post);
router.use("/user", user);
router.use("/nft", nft);
router.use("/auth", auth);
router.use("/token", token);

module.exports = router;