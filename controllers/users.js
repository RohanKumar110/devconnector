const User = require("../models/User");
const gravatar = require("gravatar");
const { validationResult } = require("express-validator");

// @desc    Register route
// @route   POST api/users
// access   PUBLIC
module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  // Check if user exists with giver email
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ errors: [{ msg: "User already exists" }] });
  }

  // Get user gravatar
  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
  });
  user = new User({ name, email, password, avatar });
  user = await user.save();

  const token = user.getSignedJwtToken();
  res.status(200).json({ token });
};
