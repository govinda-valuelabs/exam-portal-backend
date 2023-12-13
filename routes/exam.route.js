import express from 'express';
import ExamController from '../controller/exam.controller.js';

const examRouter = express.Router();
const exam = new ExamController();

examRouter.get('/', exam.getExams);
examRouter.get('/status/:studentId', exam.getExamStatus);
examRouter.get('/question', exam.questions);
examRouter.post('/start', exam.create);
examRouter.get('/:id', exam.getExam);
examRouter.patch('/:id', exam.update);
examRouter.delete('/:id', exam.delete);

export default examRouter;