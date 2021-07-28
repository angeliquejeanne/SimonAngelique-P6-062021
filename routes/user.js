const express = require('express');

//appel méthode router de express
const userRouter = express.Router();

//importation des controllers user
const userCtrl = require('../controllers/user');

//routes
userRouter.post('/signup', userCtrl.signUp);
userRouter.post('/login', userCtrl.login);

module.exports = userRouter;