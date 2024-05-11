const express = require('express');

const usersRouter = require('./users.router');
const userAuth = require ('./usersAuth.router')

function routerApi(app) {
  const router = express.Router();
  app.use('/users', usersRouter);
  app.use('/login', userAuth)
}

module.exports = routerApi;