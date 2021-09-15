const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');
const User = require('../models/user');

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
  // Validating request body
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

  const createdUser = new User({
    name: name,
    email: email,
    password: password,
    image: 'url',
    posts: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signup Failed', 500);
    return next(error);
  }

  res.status(201).json({ message: 'User Signedup', user: createdUser });
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
  if (!existingUser || existingUser.password !== password) {
    throw new HttpError('Not a Valid User', 401);
  }

  res.json({ message: 'User Logged in', user: existingUser });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
