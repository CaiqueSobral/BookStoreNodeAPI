import { Request, Response } from 'express';
import { Book } from '../models/book';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).send({ error: 'internal server error' });
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, isbn } = req.body;

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res
        .status(400)
        .json({ error: `Book with the isbn:${isbn} is already registered` });
    }

    const newBook = new Book({
      title: title,
      author: author,
      genre: genre,
      isbn: isbn,
    });

    const result = await newBook.save();
    res
      .status(201)
      .json({ message: 'Book created successfully', book: result });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, isbn } = req.body;

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res
        .status(400)
        .json({ error: `Book with the isbn:${isbn} is already registered` });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        author: author,
        genre: genre,
        isbn: isbn,
      },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
