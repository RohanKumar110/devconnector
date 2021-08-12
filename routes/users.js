const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const usersController = require("../controllers/users");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  catchAsync(usersController.register)
);

module.exports = router;
