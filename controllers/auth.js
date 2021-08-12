const User = require("../models/User");
const { validationResult } = require("express-validator");

// @desc    Get currently logged in user
// @route   GET api/auth
// access   PRIVATE
module.exports.getLoggedInUser = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id).select("-password");
  res.json(user);
};

// @desc    Authenticate user and get token
// @route   POST api/auth
// access   PUBLIC
module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // Check if user exists with giver email
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
  }

  const token = user.getSignedJwtToken();
  res.status(200).json({ token });
};
