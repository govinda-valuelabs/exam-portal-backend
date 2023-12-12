import express from 'express';
import ExamController from '../controller/exam.controller.js';

const examRouter = express.Router();
const exam = new ExamController();

examRouter.get('/', exam.getExams);
examRouter.get('/:id', exam.getExam);
examRouter.post('/', exam.create);
examRouter.patch('/:id', exam.update);
examRouter.delete('/:id', exam.delete);

export default examRouter;