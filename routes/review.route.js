import express from 'express';
import ReviewController from '../controller/review.controller.js';

const reviewRouter = express.Router();
const review = new ReviewController();

reviewRouter.get('/', review.getReviews);
reviewRouter.get('/:id', review.getReview);
reviewRouter.post('/:student', review.getReviewByStudent);
reviewRouter.post('/', review.create);
reviewRouter.patch('/:id', review.update);

export default reviewRouter;