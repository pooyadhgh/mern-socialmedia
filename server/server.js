require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const HttpError = require('./models/httpError');

const app = express();

app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

// Register routes
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

// Notfound error middleware
app.use((req, res, next) => {
  const error = new HttpError('Not Found', 404);
  throw error;
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSet) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || 'Error' });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 8080);
    console.log('Connected');
  })
  .catch(error => console.log(error));
