const express = require("express");
const router = express.Router();

// @desc    Test route
// @route   GET api/users
// access   PUBLIC
router.get("/", (req, res) => {
  res.send("User route");
});

module.exports = router;
