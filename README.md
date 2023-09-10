# Book Store API

A RESTful API for a book store with user authentication, book management, reviews, and server-side token revocation. Built using Node.js, Express.js, TypeScript, and MongoDB.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Books](#books)
  - [Reviews](#reviews)
- [Database](#database)
- [Endpoints](#endpoints)
- [JWT Token](#jwt-token)
- [Contributing](#contributing)

## Features

- User authentication with JWT tokens.
- CRUD operations for books (Create, Read, Update, Delete).
- Users can add, edit, and delete reviews for books.
- Books have unique ISBNs for identification.
- Partial search for books by title, author, or ISBN.

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- MongoDB (running locally or a remote MongoDB service)
- Git (optional)

### Installation

1. Clone the repository (if you haven't already):

```bash
  git clone https://github.com/CaiqueSobral/BookStoreNodeAPI.git
```

2. Change to the project directory:

```bash
  cd bookstorenodeapi
```

3. Install dependencies:

```bash
  npm install
```

4. Configure the environment variables in a `.env` file (see [JWT Token](#jwt-token) for details).

5. Start the server:

```bash
  npm run start:dev
```

## Usage

### Authentication

- Users must register and log in to access protected routes.
- Authentication is implemented using JSON Web Tokens (JWT). Users receive a JWT token upon successful login, which they must include in the Authorization header of subsequent requests.

- **Register**: `/api/user/register` (POST)
- **Login**: `/api/user/login` (POST)

### Books

- **Get All Books**: `/api/books` (GET)
- **Get Book by ISBN**: `/api/books/isbn/:isbn` (GET)
- **Get Books by Author**: `/api/books/author/:author` (GET)
- **Get Books by Title**: `/api/books/title/:title` (GET)
- **Add a New Book**: `/api/books` (POST)
- **Update a Book**: `/api/books/:bookId` (PUT)
- **Delete a Book**: `/api/books/:bookId` (DELETE)

### Reviews

- **Get All Reviews**: `/api/reviews/books` (GET)
- **Get Review by ID**: `/api/reviews/:reviewId` (GET)
- **Add a New Review**: `/api/reviews/books/:bookId` (POST)
- **Update a Review**: `/api/reviews/:reviewId` (PUT)
- **Delete a Review**: `/api/reviews/:reviewId` (DELETE)

## Database

- MongoDB is used as the database to store books, users, and reviews.
- Books have a unique ISBN for identification.
- Users have authentication credentials stored securely.
- Reviews are associated with books and users.

## Endpoints

- The API exposes various endpoints for book and review management.

## JWT Token

- JSON Web Tokens (JWT) are used for user authentication.
- A secret key is used to sign and verify JWT tokens.
- Users receive a JWT token upon successful login.
- The token must be included in the Authorization header for authentication.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve this project.
