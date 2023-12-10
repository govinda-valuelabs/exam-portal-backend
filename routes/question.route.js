import express from 'express';
import QuestionController from '../controller/question.controller.js';

const questionRouter = express.Router();
const question = new QuestionController();

questionRouter.get('/', question.getQuestions);
questionRouter.get('/:id', question.getQuestion);
questionRouter.post('/', question.create);
questionRouter.patch('/', question.update);
questionRouter.delete('/:id', question.delete);

export default questionRouter;