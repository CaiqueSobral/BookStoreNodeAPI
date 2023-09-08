# Book Store API

This is a simple RESTful API for a book store, built using Node.js and TypeScript. It includes user authentication with JWT and supports operations for managing books and their reviews.

## Features

- User registration and login with JWT authentication.
- CRUD operations for books (Create, Read, Update, Delete).
- CRUD operations for book reviews.

## Getting Started

Follow these steps to set up and run the project locally:

#### 1. Clone this repository:

```bash
git clone https://github.com/CaiqueSobral/BookStoreNodeAPI.git
```

#### 2. Install the project dependencies:

```bash
cd book-store-api
npm install
```

#### 3. Create a MongoDB database and update the MongoDB URI in a **.env** File.

#### 4. Start the development server:

```bash
 npm run start:dev
```

The server will be running at http://localhost:3000.

## API Endpoints

### User Authentication

- **POST** /api/register -> Register a new user.

- **POST** /api/login -> Authenticate and generate a JWT token.

### Books

- **GET** /api/books -> Get all books.
- **POST** /api/books -> Create a new book.
- **PUT** /api/books/:id -> Update a book by ID.
- **DELETE** /api/books/:id -> Delete a book by ID.

### Reviews

- **POST** /api/books/:id/reviews -> Create a review for a book.
- **PUT** /api/books/:bookId/reviews/:reviewId -> Update a review for a book.
- **DELETE** /api/books/:bookId/reviews/:reviewId -> Delete a review for a book.

### Configuration

You may need to update configuration variables in your **.env** file, such as the MongoDB URI and JWT secret key.

### Dependencies

- Node.js
- Express.js
- TypeScript
- MongoDB (You need to have MongoDB installed and running)
