const {Router} = require('express');
const { Login, Register } = require('../controller/user.controller');

const userRouter = Router();

userRouter.post('/login', Login)
userRouter.post('/register', Register)

module.exports = userRouter;