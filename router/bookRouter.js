const express=require('express');
const router=express.Router();
const {
    getAllBooks,
    getBookbyId,
    addBook,
    updateBook,
    deleteBook,

}=require("../controllers/bookcontrollers");
router.get('/',getAllBooks);
router.get('/:id',getBookbyId);
router.post("/",authenticateUser,vlidateBook,addBook);
router.put("/:id",authenticateUser,vlidateBook,updateBook);

const express = require('express');
const router = express.Router();

// Basic placeholder route
router.get('/', (req, res) => {
    res.send('Books route working!');
});

module.exports = router;
