const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.postUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/', userController.updateUser);

module.exports = userRouter;
