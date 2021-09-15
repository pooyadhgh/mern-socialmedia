require('dotenv').config();

const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 8080);
