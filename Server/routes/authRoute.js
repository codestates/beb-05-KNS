const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.post("/signup", controller.signupPost);
router.post("/login", controller.loginPost);
router.post("/logout", controller.logoutPost);

module.exports = router;