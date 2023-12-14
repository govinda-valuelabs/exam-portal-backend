import express from 'express';
import userRouter from './user.route.js';
import studentRouter from './student.route.js';
import questionRouter from './question.route.js';
import examRouter from './exam.route.js';
import attemptRouter from './attempt.route.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/student', studentRouter);
router.use('/question', questionRouter);
router.use('/exam', examRouter);
router.use('/attempt', attemptRouter);

export default router;