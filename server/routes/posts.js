const express = require('express');

const { check } = require('express-validator');

const postsControllers = require('../controllers/posts');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

// /api/posts/:pid
router.get('/:pid', postsControllers.getPostById);

// /api/posts/user/:uid
router.get('/user/:uid', postsControllers.getPostByUserId);

// /api/posts
router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('description').not().isEmpty().isLength({ min: 5 }),
  ],
  postsControllers.createPost
);

// /api/posts/:pid
router.delete('/:pid', postsControllers.deletePostById);

module.exports = router;
