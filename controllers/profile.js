const axios = require("axios");
const User = require("../models/User");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const { validationResult } = require("express-validator");

// @desc    Get all profiles
// @route   GET api/profile
// @access  PUBLIC
module.exports.getAllProfiles = async (req, res) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  res.status(200).json(profiles);
};

// @desc    Get profile by user ID
// @route   GET api/profile/user/:userid
// @access  PUBLIC
module.exports.getProfileByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const profile = await Profile.findOne({ user: user_id }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.log("Error: " + err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc    Get current user's profile
// @route   GET api/profile/me
// access   PRIVATE
module.exports.getUserProfile = async (req, res) => {
  const { id } = req.user;
  const profile = await Profile.findOne({ user: id }).populate("user", [
    "name",
    "avatar",
  ]);
  if (!profile) {
    return res.status(400).json({ msg: "Profile not found" });
  }
  res.status(200).json(profile);
};

// @desc    Create user profile
// @route   POST api/profile
// @access  PRIVATE
module.exports.createuserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.user;
  const profileFields = buildProfile(req);

  let profile = await Profile.findOne({ user: id });

  if (profile) {
    return res.status(400).json({ msg: "Profile already exists" });
  }
  profile = new Profile(profileFields);
  await profile.save();
  res.status(200).json(profile);
};

// @desc    Update user profile
// @route   PUT api/profile
// @access  PRIVATE
module.exports.updateUserProfile = async (req, res) => {
  const { id } = req.user;

  let profile = await Profile.findOne({ user: id });
  if (!profile) {
    return res.status(400).json({ msg: "Profile not found" });
  }
  const profileFields = buildProfile(req);

  profile = await Profile.findOneAndUpdate({ user: id }, profileFields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(profile);
};

// @desc    Delete profile,user and posts
// @route   DELETE api/profile
// @access  PRIVATE
module.exports.deleteUserProfile = async (req, res) => {
  const { id } = req.user;
  // Remove profile
  await Profile.findOneAndRemove({ user: id });
  // Remove Posts
  await Post.deleteMany({ user: id });
  // Remove User
  await User.findByIdAndDelete(id);

  res.status(200).json({ msg: "User deleted" });
};

// @desc    Add profile experience
// @route   PUT api/profile/experience
// @access  PRIVATE
module.exports.addProfileExperience = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.user;
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    return res.status(400).json({ msg: "Profile not found" });
  }

  const { title, company, location, from, to, current, description } = req.body;

  // Build new experience object
  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };
  profile.experience.unshift(newExperience);
  await profile.save();

  res.status(200).json(profile);
};

// @desc    Delete profile experience
// @route   DELETE api/profile/experience/:exp_id
// @access  PRIVATE
module.exports.deleteProfileExperience = async (req, res) => {
  const { id } = req.user;
  const { exp_id } = req.params;
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    return res.status(400).json({ msg: "Profile not found" });
  }
  profile.experience = profile.experience.filter(
    (exp) => exp._id.toString() !== exp_id
  );
  await profile.save();

  res.status(200).json(profile);
};

// @desc    Add profile education
// @route   PUT api/profile/education
// @access  PRIVATE
module.exports.addProfileEducation = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.user;
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    return res.status(400).json({ msg: "Profile not found" });
  }

  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;

  // Build new education object
  const newEducation = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };
  profile.education.unshift(newEducation);
  await profile.save();

  res.status(200).json(profile);
};

// @desc    Delete profile education
// @route   DELETE api/profile/education/:edu_id
// @access  PRIVATE
module.exports.deleteProfileEducation = async (req, res) => {
  const { id } = req.user;
  const { edu_id } = req.params;
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    return res.status(400).json({ msg: "Profile not found" });
  }
  profile.education = profile.education.filter(
    (edu) => edu._id.toString() !== edu_id
  );
  await profile.save();

  res.status(200).json(profile);
};

// @desc    Get user repos from github
// @route   GET api/profile/github/:username
// @access  PUBLIC
module.exports.getUserRepos = async (req, res) => {
  try {
    const { username } = req.params;
    const URI = encodeURI(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: process.env.GITHUB_TOKEN,
    };
    const githubReponse = await axios.get(URI, { headers });
    return res.json(githubReponse.data);
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ msg: "No Github Profile Found" });
  }
};

function buildProfile(req) {
  const { id } = req.user;
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    facebook,
    instagram,
    linkedin,
    twitter,
    youtube,
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = id;

  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (status) profileFields.status = status;
  if (skills)
    profileFields.skills = skills.split(",").map((s) => s.trim().toUpperCase());
  if (bio) profileFields.bio = bio;
  if (githubusername) profileFields.githubusername = githubusername;

  // Build Social Object
  profileFields.social = {};
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (twitter) profileFields.social.twitter = twitter;
  if (youtube) profileFields.social.youtube = youtube;

  return profileFields;
}
