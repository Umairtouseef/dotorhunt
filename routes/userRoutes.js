const express = require("express");
const passport = require("passport");
const { userController } = require("../Controllers");

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", passport.authenticate("local"), userController.loginUser);
router.get("/protected-route", userController.checkAuth);
router.get("/logout", userController.logout);
router.post("/reset-password-request", userController.resetPasswordRequest);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
