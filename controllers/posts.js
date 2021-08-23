const Post = require("../models/Post");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// @desc    Get all posts
// @route   GET api/posts
// @access  PRIVATE
module.exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// @desc    Get the post by id
// @route   GET api/posts/:id
// @access  PRIVATE
module.exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc    Create the post
// @route   POST api/posts
// access   PRIVATE
module.exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.user;
  const { text } = req.body;
  const user = await User.findById(id).select("-password");
  let post = new Post({
    text,
    user: user._id,
    name: user.name,
    avatar: user.avatar,
  });
  post = await post.save();
  res.status(200).json(post);
};

// @desc    Delete post by id
// @route   DELETE api/posts/:id
// @access  PRIVATE
module.exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }
    // Check if user not owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.remove();
    return res.status(200).json({ msg: "Post Removed" });
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    res.json(500).send("Server Error");
  }
};

// @desc    Like a post
// @route   PUT api/posts/like/:id
// @access  PRIVATE
module.exports.likePost = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }
    // Check if the post has already been liked
    const filteredPosts = post.likes.filter(
      (like) => like.user.toString() === user.id
    );
    if (filteredPosts.length > 0) {
      // Post already liked
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: user.id });

    await post.save();
    res.status(200).json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    res.json(500).send("Server Error");
  }
};

// @desc    Unlike a post
// @route   DELETE api/posts/unlike/:id
// @access  PRIVATE
module.exports.unlikePost = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }
    // Check if the post has not been liked
    const filteredPosts = post.likes.filter(
      (like) => like.user.toString() === user.id
    );
    if (filteredPosts.length === 0) {
      // Post has not been liked
      return res.status(400).json({ msg: "Post has not been liked yet" });
    }
    post.likes = post.likes.filter((like) => like.user.toString() !== user.id);
    await post.save();
    res.status(200).json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    res.json(500).send("Server Error");
  }
};

// @desc    Add comment on a post
// @route   PUT api/posts/comment/:id
// @access  PRIVATE
module.exports.addComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { text } = req.body;
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }
    const comment = {
      text,
      user: user._id,
      name: user.name,
      avatar: user.avatar,
    };
    post.comments.unshift(comment);
    await post.save();
    return res.status(200).json(post.comments);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    res.json(500).send("Server Error");
  }
};

// @desc    Delete comment from a post
// @route   DELETE api/posts/comment/:id/:comment_id
// @access  PRIVATE
module.exports.deleteComment = async (req, res) => {
  try {
    const { id, comment_id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }
    // Get comment from post
    const comment = post.comments.find(
      (comment) => comment._id.toString() === comment_id
    );
    // Check if comment exists
    if (!comment) {
      return res.status(400).json({ msg: "Comment does not exist" });
    }
    // Check if user owned the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== comment_id
    );
    await post.save();
    return res.status(200).json(post.comments);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    res.json(500).send("Server Error");
  }
};
