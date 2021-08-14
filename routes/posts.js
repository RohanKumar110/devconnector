const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const protectRoute = require("../middlewares/auth");
const postsController = require("../controllers/posts");

router.get("/", protectRoute, catchAsync(postsController.getPosts));

router.get("/:id", protectRoute, postsController.getPost);

router.post(
  "/",
  [protectRoute, check("text", "Text is Required").not().isEmpty()],
  catchAsync(postsController.createPost)
);

router.put("/like/:id", protectRoute, postsController.likePost);

router.put(
  "/comment/:id",
  [protectRoute, check("text", "Text is Required").not().isEmpty()],
  postsController.addComment
);

router.delete("/unlike/:id", protectRoute, postsController.unlikePost);

router.delete(
  "/comment/:id/:comment_id",
  protectRoute,
  postsController.deleteComment
);

router.delete("/:id", protectRoute, catchAsync(postsController.deletePost));

module.exports = router;
