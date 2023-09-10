import { Router } from 'express';
import * as bookController from '../controllers/bookController.ts';
import { verifyToken } from '../middlewares/authMiddleware.ts';

export const bookRouter = Router();

bookRouter.get('/books', verifyToken, bookController.getBooks);
bookRouter.post('/books', verifyToken, bookController.addBook);
bookRouter.put('/books/:id', verifyToken, bookController.updateBook);
bookRouter.delete('/books/:id', verifyToken, bookController.addBook);
bookRouter.get('/books/isbn/:isbn', verifyToken, bookController.getBooksByIsbn);
bookRouter.get(
  '/books/author/:author',
  verifyToken,
  bookController.getBooksByAuthor
);
bookRouter.get(
  '/books/title/:title',
  verifyToken,
  bookController.getBooksByTitle
);
