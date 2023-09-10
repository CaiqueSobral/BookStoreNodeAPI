import { Request, Response } from 'express';
import { Book } from '../models/book';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().populate({
      path: 'reviews',
      populate: { path: 'userId', select: 'username -_id' },
      select: '-userId -bookId',
    });
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

export const getBooksByIsbn = async (req: Request, res: Response) => {
  try {
    const isbn = req.params.isbn;
    const book = await Book.findOne({ isbn }).populate({
      path: 'reviews',
      populate: { path: 'userId', select: 'username -_id' },
      select: '-userId -bookId',
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBooksByAuthor = async (req: Request, res: Response) => {
  try {
    const author = decodeURIComponent(req.params.author);
    const books = await Book.find({
      author: { $regex: author, $options: 'i' },
    }).populate({
      path: 'reviews',
      populate: { path: 'userId', select: 'username -_id' },
      select: '-userId -bookId',
    });

    if (books.length === 0) {
      return res
        .status(404)
        .json({ error: 'No books registered for this author' });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBooksByTitle = async (req: Request, res: Response) => {
  try {
    const title = decodeURIComponent(req.params.title);
    const books = await Book.find({
      title: { $regex: title, $options: 'i' },
    }).populate({
      path: 'reviews',
      populate: { path: 'userId', select: 'username -_id' },
      select: '-userId -bookId',
    });

    if (books.length === 0) {
      return res.status(404).json({ error: 'No books found with this title' });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
