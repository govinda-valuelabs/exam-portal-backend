import express from 'express';
import AnswerController from '../controller/answer.controller.js';

const answerRouter = express.Router();
const answer = new AnswerController();

answerRouter.get('/:questionId/:studentId', answer.getByQuestion);
answerRouter.post('/:studentId', answer.getAnswersByExam);
answerRouter.get('/', answer.getAnswers);
answerRouter.post('/', answer.create);
answerRouter.patch('/:id', answer.update);

export default answerRouter;