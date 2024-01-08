import express from 'express';
import FeedbackController from '../controller/feedback.controller.js';

const feedbackRouter = express.Router();
const feedback = new FeedbackController();

feedbackRouter.get('/:question/:student', feedback.getOneByQuestion);
feedbackRouter.get('/:question', feedback.getByQuestion);
feedbackRouter.get('/', feedback.getFeedbacks);
feedbackRouter.post('/detail/:id', feedback.getFeedback);
feedbackRouter.post('/', feedback.create);
feedbackRouter.patch('/:id', feedback.update);

export default feedbackRouter;