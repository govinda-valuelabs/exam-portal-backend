import express from 'express';
import userRouter from './user.route.js';
import studentRouter from './student.route.js';
import questionRouter from './question.route.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/student', studentRouter);
router.use('/question', questionRouter);

export default router;