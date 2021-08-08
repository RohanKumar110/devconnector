const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/", usersController.testRoute);

module.exports = router;
