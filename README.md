# 📚 Library Management System

A RESTful API built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose** to manage books and borrowing records.

---

## 📝 Brief Description

This project enables efficient library resource tracking. It allows users to manage book records and borrowing transactions with strict validation and clear API endpoints.

---

## 🚀 Key Features

- Add, update, delete, and view books
- Borrow books with quantity tracking
- Filter by genre and sort books
- Aggregated summary of borrowed books
- Mongoose schema validation
- Pre-save middleware for business logic
- Structured error handling

---

## 📦 Technologies Used

- **Express.js** — Server framework  
- **TypeScript** — Type-safe JavaScript  
- **MongoDB** — NoSQL database  
- **Mongoose** — ODM for MongoDB  
- **Nodemon / ts-node-dev** — Development tools

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system

2. Install dependencies
bash

npm install
3. Configure Environment Variables
Create a .env file in the root directory and add the following:

env


DATABASE_URL=mongodb://localhost:27017/library
PORT=5000
4. Run the development server
bash

npm run dev
📘 How to Use / API Endpoints
➕ Create a Book
POST /api/books

json

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```
📚 Get All Books
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

Supports:

filter: Filter by genre

sortBy: Field to sort by

sort: asc or desc

limit: Number of books

🧾 Get Book by ID
GET /api/books/:bookId

✏️ Update Book
PUT /api/books/:bookId


{
  "copies": 10
}
❌ Delete Book
DELETE /api/books/:bookId

📥 Borrow a Book
POST /api/borrow

json

{
  "book": "BOOK_OBJECT_ID",
  "quantity": 2,
  "dueDate": "2025-07-20"
}
✅ Business Logic:

Reduces available copies

If copies = 0, marks book as unavailable

📊 Borrow Summary (Aggregation)
GET /api/borrow

Response:

json

{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
❗ Error Example
json

{
  "success": false,
  "message": "Validation failed",
  "error": "Not enough copies available"
}