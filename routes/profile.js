const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const protectRoute = require("../middlewares/auth");
const profileController = require("../controllers/profile");

router.get("/", catchAsync(profileController.getAllProfiles));

router.get("/me", protectRoute, catchAsync(profileController.getUserProfile));

router.get("/user/:user_id", profileController.getProfileByUserId);

router.get("/github/:username", profileController.getUserRepos);

router.post(
  "/",
  [
    protectRoute,
    [
      check("status", "Status is Required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  catchAsync(profileController.createuserProfile)
);

router.put("/", protectRoute, catchAsync(profileController.updateUserProfile));

router.put(
  "/experience",
  [
    protectRoute,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From Date is required").not().isEmpty(),
    ],
  ],
  catchAsync(profileController.addProfileExperience)
);

router.put(
  "/education",
  [
    protectRoute,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of Study is required").not().isEmpty(),
      check("from", "From Date is required").not().isEmpty(),
    ],
  ],
  catchAsync(profileController.addProfileEducation)
);

router.delete(
  "/",
  protectRoute,
  catchAsync(profileController.deleteUserProfile)
);

router.delete(
  "/experience/:exp_id",
  protectRoute,
  catchAsync(profileController.deleteProfileExperience)
);

router.delete(
  "/education/:edu_id",
  protectRoute,
  catchAsync(profileController.deleteProfileEducation)
);

module.exports = router;
