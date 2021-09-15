const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');

let posts = [];

const getPostById = (req, res, next) => {
  const postId = req.params.pid;
  const post = posts.find(post => post.id === postId);

  if (!post) {
    return next(new HttpError('Post Not Found', 404));
  }

  res.json({ post: post });
};

const getPostByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const post = posts.find(post => post.creator === userId);

  if (!post) {
    return next(new HttpError('Post Not Found', 404));
  }

  res.json({ post: post });
};

const createPost = (req, res, next) => {
  // Validating request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid Input', 422);
  }

  const { title, description, creator } = req.body;
  const createdPost = {
    id: Math.ceil(Math.random() * 1000),
    title: title,
    description: description,
    creator: creator,
  };
  posts.push(createdPost);
  res.status(201).json({ post: createdPost });
};

const deletePostById = (req, res, next) => {
  const postId = req.params.pid;
  posts = posts.filter(post => post.id !== postId);
  res.status(200).json({ message: 'Post Deleted', posts: posts });
};

exports.getPostById = getPostById;
exports.getPostByUserId = getPostByUserId;
exports.createPost = createPost;
exports.deletePostById = deletePostById;
