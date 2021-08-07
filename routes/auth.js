const express = require("express");
const router = express.Router();

// @desc    Test route
// @route   GET api/auth
// access   PUBLIC
router.get("/", (req, res) => {
  res.send("Auth route");
});

module.exports = router;
