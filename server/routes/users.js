const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

// /api/users
router.get('/', usersControllers.getUsers);

// /api/users/signup
router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name').not().isEmpty(),
    check('email')
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .not()
      .isEmpty(),
    check('password').not().isEmpty().isLength({ min: 5 }),
  ],
  usersControllers.signup
);

// /api/users/login
router.post('/login', usersControllers.login);

// /api/users/reset-password
router.post('/reset-password', usersControllers.resetPassword);

// /api/users/reset-password/:token
router.post(
  '/reset-password/:token',
  [check('password').not().isEmpty().isLength({ min: 5 })],
  usersControllers.resetPasswordWithToken
);

module.exports = router;
