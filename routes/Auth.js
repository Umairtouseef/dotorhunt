const express = require("express");
const passport = require("passport");
const {
  createUser,
  loginUser,
  checkAuth,
  logout,
} = require("../Controllers/Auth");

const router = express.Router();

router
  .post("/signup", createUser)
  .get("/check", passport.authenticate("jwt"), checkAuth)
  .get("/logout", logout)
  .post("/signin", passport.authenticate("local"), loginUser);

exports.router = router;
