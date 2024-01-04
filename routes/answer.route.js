import express from 'express';
import multer from 'multer';
import AnswerController from '../controller/answer.controller.js';

const answerRouter = express.Router();
const answer = new AnswerController();
const upload = multer({ dest: '../uploads/' })

answerRouter.get('/:questionId/:studentId', answer.getByQuestion);
answerRouter.post('/:studentId', answer.getAnswersByExam);
answerRouter.get('/', answer.getAnswers);
answerRouter.post('/', answer.create);
answerRouter.post('/upload', answer.create);
answerRouter.patch('/:id', answer.update);

export default answerRouter;