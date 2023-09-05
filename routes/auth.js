const express = require("express");
const Authrouter = express.Router();
const {
  NewUserSignup,
  login,
  logout,
} = require("../controller/Authcontroller");

// router.get("/info");
Authrouter.post("/register", NewUserSignup);
Authrouter.post("/login", login);
Authrouter.post("/logout", logout);
// router.post("/info/update");

module.exports = Authrouter;
