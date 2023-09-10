import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    select: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export const Review = mongoose.model('Review', reviewSchema);
