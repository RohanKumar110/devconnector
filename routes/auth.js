const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const protectRoute = require("../middlewares/auth");
const authController = require("../controllers/auth");

router.get("/", protectRoute, catchAsync(authController.getLoggedInUser));

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please include a password").exists(),
  ],
  catchAsync(authController.login)
);

module.exports = router;
