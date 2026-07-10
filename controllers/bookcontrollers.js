/***********************************************************************
 *
 * File Name : bookController.js
 *
 * Purpose:
 * --------
 * This file contains all the business logic (CRUD operations)
 * for the Library Management System.
 *
 * CRUD stands for:
 *
 * C - Create
 * R - Read
 * U - Update
 * D - Delete
 *
 ***********************************************************************/

// Import Book Model
// We use this model to interact with the MongoDB database.
const Book = require("../models/Book");


/***********************************************************************
 *
 * GET ALL BOOKS
 *
 * API:
 * GET /api/books
 *
 * Purpose:
 * Fetch all books stored in MongoDB.
 *
 ***********************************************************************/
const getAllBooks = async (req, res) => {

    try {

        // Fetch all books
        // Sort by newest first
        const books = await Book.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Unable to fetch books.",
            error: error.message
        });

    }

};



/***********************************************************************
 *
 * GET SINGLE BOOK
 *
 * API:
 * GET /api/books/:id
 *
 * Purpose:
 * Fetch one book using its MongoDB _id.
 *
 ***********************************************************************/
const getBookById = async (req, res) => {

    try {

        // Find book by ID
        const book = await Book.findById(req.params.id);

        // Check if the book exists
        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book not found."
            });

        }

        res.status(200).json({
            success: true,
            data: book
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Unable to fetch the book.",
            error: error.message
        });

    }

};



/***********************************************************************
 *
 * ADD NEW BOOK
 *
 * API:
 * POST /api/books
 *
 * Purpose:
 * Insert a new book into MongoDB.
 *
 ***********************************************************************/
const addBook = async (req, res) => {

    try {

        // Destructure request body
        const {
            title,
            author,
            description,
            published_date
        } = req.body;

        // Basic Validation
        if (!title || !author) {

            return res.status(400).json({
                success: false,
                message: "Title and Author are required."
            });

        }

        // Create a new document
        const newBook = await Book.create({

            title,
            author,
            description,
            published_date

        });

        res.status(201).json({

            success: true,
            message: "Book added successfully.",
            data: newBook

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: "Unable to add book.",
            error: error.message

        });

    }

};



/***********************************************************************
 *
 * UPDATE BOOK
 *
 * API:
 * PUT /api/books/:id
 *
 * Purpose:
 * Update an existing book.
 *
 ***********************************************************************/
const updateBook = async (req, res) => {

    try {

        // Find book by ID and update it
        const updatedBook = await Book.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,          // Return updated document
                runValidators: true // Validate updated data
            }

        );

        // Check if book exists
        if (!updatedBook) {

            return res.status(404).json({

                success: false,
                message: "Book not found."

            });

        }

        res.status(200).json({

            success: true,
            message: "Book updated successfully.",
            data: updatedBook

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: "Unable to update book.",
            error: error.message

        });

    }

};



/***********************************************************************
 *
 * DELETE BOOK
 *
 * API:
 * DELETE /api/books/:id
 *
 * Purpose:
 * Delete a book from MongoDB.
 *
 ***********************************************************************/
const deleteBook = async (req, res) => {

    try {

        // Find the book and delete it
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        // If book doesn't exist
        if (!deletedBook) {

            return res.status(404).json({

                success: false,
                message: "Book not found."

            });

        }

        res.status(200).json({

            success: true,
            message: "Book deleted successfully."

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: "Unable to delete book.",
            error: error.message

        });

    }

};



/***********************************************************************
 *
 * Export All Controller Functions
 *
 * These functions will be used inside routes/bookRoutes.js
 *
 ***********************************************************************/

module.exports = {

    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook

};