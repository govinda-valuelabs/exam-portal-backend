import express from 'express';
import ExamController from '../controller/exam.controller.js';

const attemptRouter = express.Router();
const exam = new ExamController();

attemptRouter.post('/:studentId', exam.updateExam);

export default attemptRouter;