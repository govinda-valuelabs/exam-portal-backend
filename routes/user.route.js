import express from 'express';
import UserController from '../controller/user.controller.js';

const userRouter = express.Router();
const user = new UserController();

userRouter.post('/login', user.login);
userRouter.get('/logout', user.logout);
userRouter.get('/', user.getUsers);
userRouter.get('/:id', user.getUser);
userRouter.post('/', user.create);
userRouter.patch('/', user.update);
userRouter.delete('/:id', user.delete);

export default userRouter;