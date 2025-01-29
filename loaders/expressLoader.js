const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sessionConfig = require("../Config/session");
const passportConfig = require("../Config/passport");


const expressLoader = (app) => {
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  sessionConfig(app);
  passportConfig();

  console.log("Express middleware initialized");
};

module.exports = expressLoader;
