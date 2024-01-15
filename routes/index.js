import express from 'express';
import userRouter from './user.route.js';
import studentRouter from './student.route.js';
import questionRouter from './question.route.js';
import examRouter from './exam.route.js';
import attemptRouter from './attempt.route.js';
import categoryRouter from './category.route.js';
import answerRouter from './answer.route.js';
import feedbackRouter from './feedback.route.js';
import attachmentRouter from './attachment.route.js';
import reviewRouter from './review.route.js';
import exportRouter from './export.route.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/student', studentRouter);
router.use('/question', questionRouter);
router.use('/exam', examRouter);
router.use('/attempt', attemptRouter);
router.use('/category', categoryRouter);
router.use('/answer', answerRouter);
router.use('/feedback', feedbackRouter);
router.use('/attachment', attachmentRouter);
router.use('/review', reviewRouter);
router.use('/export', exportRouter);

export default router;