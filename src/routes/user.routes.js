const {Router} = require('express');
const { Login, Register, GetUserData} = require('../controller/user.controller');

const userRouter = Router();

userRouter.post('/login', Login)
userRouter.post('/register', Register)
userRouter.get('/get', GetUserData)

module.exports = userRouter;