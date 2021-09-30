const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');
const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError('Could Not Find Users', 500);
    return next(error);
  }

  res.json({ users: users });
};

const signup = async (req, res, next) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid Input', 422);
  }
  const { name, email, password } = req.body;

  // Check if user is registered before or not
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Signup Failed', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('User Existed', 422);
    return next(error);
  }

  // Hash password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Could Not Create User', 500);
    return next(error);
  }

  const createdUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
    image: req.file.path,
    posts: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signup Failed', 500);
    return next(error);
  }

  let token;

  try {
    token = await jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY
    );
  } catch (err) {
    const error = new HttpError('Signup Failed', 500);
    return next(error);
  }

  res.status(201).json({
    message: 'User Signedup',
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  // Check whether user exists or not
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Login Failed', 500);
    return next(error);
  }

  // Check if user entered correct password
  if (!existingUser) {
    const error = new HttpError('Invalid Inputs', 401);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError('Could Not Login', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid Inputs', 401);
    return next(error);
  }

  let token;

  try {
    token = await jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY
    );
  } catch (err) {
    const error = new HttpError('Login Failed', 500);
    return next(error);
  }

  res.json({
    message: 'User Logged in',
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const resetPassword = async (req, res, next) => {
  const { email } = req.body;
  let existingUser;

  // Check whether user exists or not
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Finding User Failed', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('User Not Found', 401);
    return next(error);
  }

  let token;

  try {
    token = await jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Login Failed', 500);
    return next(error);
  }

  sendEmail(
    existingUser.email,
    'Password Reset',
    `
    To reset your password please click on the link below:

    ${process.env.BASE_URL}/reset-password/${token}
    `
  );

  res.json({
    message: 'Email Sent',
    userId: existingUser.id,
    email: existingUser.email,
  });
};

const resetPasswordWithToken = async (req, res, next) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid Input', 422);
  }

  const token = req.params.token;
  const { password } = req.body;

  if (!token) {
    const error = new HttpError('Auth Failed', 401);
    return next(error);
  }

  const decodedToken = jwt.verify(token, process.env.JWT_KEY);

  let user;

  // Check whether user exists or not
  try {
    user = await User.findOne({ email: decodedToken.email });
  } catch (err) {
    const error = new HttpError('Finding User Failed', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('User Not Found', 401);
    return next(error);
  }

  // Hash password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Could Not Create User', 500);
    return next(error);
  }

  user.password = hashedPassword;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError('Changing Password Failed', 500);
    return next(error);
  }

  res.json({
    message: 'Password Changed Successfully',
    userId: user.id,
    email: user.email,
  });
};

module.exports = {
  getUsers,
  signup,
  login,
  resetPassword,
  resetPasswordWithToken,
};
