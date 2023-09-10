import { Request, Response } from 'express';
import { Review } from '../models/review';
import { Book } from '../models/book';

export const addReviewWithBookId = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

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
    await Book.findByIdAndUpdate(bookId, { $push: { reviews: newReview._id } });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find()
      .populate('bookId', 'title author genre')
      .populate('userId', 'username -_id');

    res.status(200).json(reviews);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;
    const userId = req.body.userId;

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
    const reviewId = req.params.reviewId;

    const deletedReview = await Review.findOneAndRemove({
      _id: reviewId,
    });

    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
