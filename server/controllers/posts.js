const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');
const Post = require('../models/post');
const User = require('../models/user');

const getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;

  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError('Could Not Find the Post', 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError('Post Not Found', 404);
    return next(error);
  }
  // TODO: Delete password from user document

  res.json({ post: post });
};

const getPostByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let posts;

  try {
    posts = await Post.find({ creator: userId });
  } catch (err) {
    const error = new HttpError('Could Not Find Posts', 500);
    return next(error);
  }

  if (!posts) {
    const error = new HttpError('Post Not Found', 404);
    return next(error);
  }
  // TODO: Delete password from user document

  res.json({ posts: posts });
};

const createPost = async (req, res, next) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid Input', 422);
  }

  const { title, description, creator } = req.body;

  const createdPost = new Post({
    title: title,
    description: description,
    image: req.file.path,
    creator: creator,
  });

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('Creating Post Failed!', 500);
    return next(error);
  }

  // Check if user exists or not

  if (!user) {
    const error = new HttpError('Could Not Find the User', 422);
    return next(error);
  }

  try {
    await createdPost.save();
    user.posts.push(createdPost);
    await user.save();
  } catch (err) {
    const error = new HttpError('Creating Post Failed!', 500);
    return next(error);
  }
  // TODO: Delete password from user document
  res
    .status(201)
    .json({ message: 'Post Created Successfully', post: createdPost });
};

const deletePostById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;

  try {
    post = await Post.findById(postId).populate('creator');
  } catch (err) {
    const error = new HttpError('Could Not Delete the Post', 500);
    return next(error);
  }

  try {
    await post.remove();
    // Delete post from user model
    post.creator.posts.pull(post);
    await post.creator.save();
  } catch (err) {
    const error = new HttpError('Could Not Delete the Post', 500);
    return next(error);
  }
  // TODO: Delete password from user document

  res.status(200).json({ message: 'Post Deleted', post: post });
};

module.exports = {
  getPostById,
  getPostByUserId,
  createPost,
  deletePostById,
};
