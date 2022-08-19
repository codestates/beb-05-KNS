const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");

router.get("/", controller.postGet);
router.post("/", controller.postWrite);
router.get("/:userID/post", controller.userPostInfo);
router.get("/:postID", controller.postInfoGet);
router.put("/:postID", controller.postRetouch);
router.delete("/:postID", controller.postDelete);
router.put("/:postID", controller.postLike);
router.get("/:postID/comments", controller.commentGet);
router.post("/:postID/comments", controller.commentPost);
router.put("/:postID/comments", controller.commentRetouch);
router.delete("/:postID/comments", controller.commentDelet);

module.exports = router;