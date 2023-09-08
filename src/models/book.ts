import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  isbn: String, // ISBN for books in Brazil
});

const Book = mongoose.model('Book', bookSchema);
