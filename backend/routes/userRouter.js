const express = require('express');
const usersController = require('../controllers/userCtrl');
const router = express.Router();


const userRouter = express.Router();

//register
userRouter.post('/api/v1/users/register',usersController.register)
//login
userRouter.post('/api/v1/users/login',usersController.login)

module.exports = userRouter;