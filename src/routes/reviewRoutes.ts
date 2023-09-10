import { Router } from 'express';
import * as reviewController from '../controllers/reviewController';
import { verifyToken } from '../middlewares/authMiddleware';

export const reviewRouter = Router();

reviewRouter.get('/books/reviews', verifyToken, reviewController.getAllReviews);

reviewRouter.post(
  '/books/:bookId/reviews',
  verifyToken,
  reviewController.addReviewWithBookId
);
reviewRouter.put(
  '/books/:bookId/reviews/:reviewId',
  verifyToken,
  reviewController.updateReview
);
reviewRouter.delete(
  '/books/:bookId/reviews/:reviewId',
  verifyToken,
  reviewController.addReviewWithBookId
);
