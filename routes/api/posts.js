const express = require("express");
const router = express.Router();
const validatePostInput = require("../../validation/post");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// @route   GET api/posts/test
// @desc    tests posts route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Posts Works!!" }));

// @route   GET api/posts
// @desc    get all posts
// @access  public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPostsFound: "No posts found." }));
});

// @route   DELETE api/posts/:id
// @desc    delete one post
// @access  private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: "User not authorized" });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json(res.json(err)));
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            0 <=
            post.likes.findIndex(like => {
              return like.user.toString() === req.user.id;
            })
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "User has already liked the post" });
          }
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ postNotFound: "Post was not found", err })
        );
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike a post
// @access  private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          const userIndex = post.likes.findIndex(like => {
            return like.user.toString() === req.user.id;
          });
          if (userIndex < 0) {
            return res
              .status(400)
              .json({ notLiked: "User has not liked the post" });
          } else {
            post.likes.splice(userIndex, 1);
            post.save().then(post => res.json(post));
          }
        })
        .catch(err =>
          res.status(404).json({ postNotFound: "Post was not found", err })
        );
    });
  }
);

// @route   GET api/posts/:id
// @desc    get one post
// @access  public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ noPostFound: "No post found with given id" })
    );
});

// @route   POST api/posts
// @desc    Add a new post
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // If input values don't pass validation, send error response
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

// @route   POST api/posts/comment/:id
// @desc    Comment a post
// @access  private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // If input values don't pass validation, send error response
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          user: req.user.id,
          text: req.body.text,
          avatar: req.body.avatar,
          name: req.body.name
        };
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ postNotFound: "Post was not found", err })
      );
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment from a post
// @access  private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const commentIndex = post.comments.findIndex(comment => {
          return comment._id.toString() === req.params.comment_id;
        });
        if (commentIndex < 0) {
          return res.status(400).json({ commentNotFound: "Comment not found" });
        } else {
          if (req.user.id !== post.comments[commentIndex].user.toString()) {
            return res
              .status(401)
              .json({ notUsersComment: "Comment was not made by the user" });
          }
          post.comments.splice(commentIndex, 1);
          post.save().then(post => res.json(post));
        }
      })
      .catch(err =>
        res.status(404).json({ postNotFound: "Post was not found", err })
      );
  }
);

module.exports = router;
