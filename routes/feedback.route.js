import express from 'express';
import multer from 'multer';
import FeedbackController from '../controller/feedback.controller.js';

const feedbackRouter = express.Router();
const feedback = new FeedbackController();

feedbackRouter.get('/:question/:student', feedback.getOneByQuestion);
feedbackRouter.get('/:question', feedback.getByQuestion);
feedbackRouter.get('/', feedback.getFeedbacks);
feedbackRouter.get('/:id', feedback.getFeedback);
feedbackRouter.post('/', feedback.create);
feedbackRouter.patch('/:id', feedback.update);

export default feedbackRouter;