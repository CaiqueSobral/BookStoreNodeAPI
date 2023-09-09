import { Request, Response } from 'express';
import { Review } from '../models/review';

export const addReviewWithBookId = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    const { userId, rating, comment } = req.body;

    const existingReview = await Review.findOne({ bookId, userId });
    if (existingReview) {
      return res
        .status(400)
        .json({ error: 'User has already reviewed this book' });
    }

    const newReview = new Review({
      bookId,
      userId,
      rating: rating,
      comment: comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;
    const userId = req.body.userId; // You can obtain this from the JWT token

    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId, bookId, userId },
      { rating: req.body.rating, comment: req.body.comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;
    const userId = req.body.userId; // You can obtain this from the JWT token

    const deletedReview = await Review.findOneAndRemove({
      _id: reviewId,
      bookId,
      userId,
    });

    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
