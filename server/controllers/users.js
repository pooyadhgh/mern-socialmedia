const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');

let users = [];

const getUsers = (req, res, next) => {
  res.json({ users: users });
};

const signup = (req, res, next) => {
  // Validating request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid Input', 422);
  }
  const { name, email, password } = req.body;
  const createdUser = {
    id: Math.ceil(Math.random() * 1000),
    name: name,
    email: email,
    password: password,
  };
  users.push(createdUser);
  res.status(201).json({ message: 'User Signedup', user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  // Check whether user exists or not
  const validUser = users.find(user => user.email === email);
  if (!validUser || validUser.password !== password) {
    throw new HttpError('Not a Valid User', 401);
  }

  res.json({ message: 'User Logged in', user: validUser });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
