const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 6,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Sign JWT and return it
userSchema.methods.getSignedJwtToken = function () {
  const payload = {
    user: {
      id: this._id,
    },
  };
  const options = {
    expiresIn: process.env.JWT_EXPIRE,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Match user entered password to hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;
