# Library Management System

A RESTful API for managing books, members, and borrowing operations in a library.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd Library-Management
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start on `http://localhost:4000` (or the port specified in your environment variables).

## API Documentation

### Base URL
```
http://localhost:4000/api
```

### Endpoints

#### Books
- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `POST /books` - Create a new book
- `PUT /books/:id` - Update book by ID
- `DELETE /books/:id` - Delete book by ID

#### Members
- `GET /members` - Get all members
- `GET /members/:id` - Get member by ID
- `POST /members` - Create a new member
- `PUT /members/:id` - Update member by ID
- `DELETE /members/:id` - Delete member by ID

#### Borrowing
- `POST /borrow` - Borrow a book
- `PUT /return` - Return a book

## HTTP Request Examples

### Books API

#### Get All Books
```bash
GET /api/books
```

#### Get Book by ID
```bash
GET /api/books/1
```

#### Create a New Book
```bash
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "category": "Fiction",
  "copies": 5,
  "available_copies": 5
}
```

#### Update Book
```bash
PUT /api/books/1
Content-Type: application/json

{
  "title": "The Great Gatsby (Updated)",
  "author": "F. Scott Fitzgerald",
  "category": "Classic Fiction",
  "copies": 3,
  "available_copies": 2
}
```

#### Delete Book
```bash
DELETE /api/books/1
```

### Members API

#### Get All Members
```bash
GET /api/members
```

#### Get Member by ID
```bash
GET /api/members/1
```

#### Create a New Member
```bash
POST /api/members
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

#### Update Member
```bash
PUT /api/members/1
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe.updated@example.com"
}
```

#### Delete Member
```bash
DELETE /api/members/1
```

### Borrowing API

#### Borrow a Book
```bash
POST /api/borrow
Content-Type: application/json

{
  "book_id": "507f1f77bcf86cd799439011",
  "member_id": "507f1f77bcf86cd799439012"
}
```

#### Return a Book
```bash
POST /api/return
Content-Type: application/json

{
  "id": "507f1f77bcf86cd799439013"
}
```

## Response Format

API responses vary by endpoint:

### Book Responses
- **Success**: Returns the book object directly
- **Error**: `{ "error": "Error message" }`

### Member Responses  
- **Success**: Returns the member object directly
- **Error**: `{ "error": "Error message" }`

### Borrowing Responses
- **Success**: Returns the borrow record object directly
- **Error**: `{ "error": "Error message" }`

## Testing

Run the test suite:
```bash
npm test
```