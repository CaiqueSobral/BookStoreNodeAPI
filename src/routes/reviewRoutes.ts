import { Router } from 'express';
import * as reviewController from '../controllers/reviewController.ts';
import {
  authorizeReviewDelete,
  verifyToken,
} from '../middlewares/authMiddleware.ts';

export const reviewRouter = Router();

reviewRouter.get('/reviews/books', verifyToken, reviewController.getAllReviews);
reviewRouter.get(
  '/reviews/:reviewId',
  verifyToken,
  reviewController.getReviewById
);

reviewRouter.post(
  '/reviews/books/:bookId',
  verifyToken,
  reviewController.addReviewWithBookId
);
reviewRouter.put(
  '/reviews/:reviewId',
  verifyToken,
  reviewController.updateReview
);
reviewRouter.delete(
  '/reviews/:reviewId',
  [verifyToken, authorizeReviewDelete],
  reviewController.deleteReview
);
