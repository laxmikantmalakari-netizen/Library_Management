const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,

        required: [true, "Title is required"],
        
        trim: true
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    published_date: {
        type: Date
    }
}, {
    timestamps: true
   }
);
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;