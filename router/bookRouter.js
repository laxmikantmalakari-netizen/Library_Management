const express = require('express');
const router = express.Router();

// 1. Correctly import the controller functions (Fixed case-sensitivity and singular 'bookController')
const {
    getAllBooks,
    getBookById, // Fixed capital 'B'
    addBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

// 2. Import the missing middleware layers
const authenticateUser = require("../middleware/authenticateUser"); // Adjust path if needed
const { validateBook } = require("../middleware/validateBook"); // Fixed spelling and adjust path if needed

// Public Routes (Anyone can view books)
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Protected Routes (Requires a valid login token and valid data fields)
router.post("/", authenticateUser, validateBook, addBook); // Fixed 'vlidateBook' typo
router.put("/:id", authenticateUser, validateBook, updateBook); // Fixed 'vlidateBook' typo
router.delete("/:id", authenticateUser, deleteBook); // Added the missing DELETE route!

module.exports = router;

