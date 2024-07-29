const express = require('express');
const usersController = require('../controllers/userCtrl');
const isAuthenticated = require('../middlewares/isAuth');
const userRouter = express.Router();

//register
userRouter.post('/api/v1/users/register',usersController.register)
//login
userRouter.post('/api/v1/users/login',usersController.login)
//profile
userRouter.get('/api/v1/users/profile', isAuthenticated, usersController.profile)
//change password
userRouter.put('/api/v1/users/change-password', isAuthenticated, usersController.changeUserPassword)
//update profile
userRouter.put('/api/v1/users/update-profile', isAuthenticated, usersController.updateUserProfile)

module.exports = userRouter;