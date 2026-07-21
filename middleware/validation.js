const { body, validationResult } = require('express-validator');

// 1. Fixed camelCase naming to match the export statement
const validateBook = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage("Book title is required.")
        .isLength({ min: 3 })
        .withMessage("Title must contain at least 3 characters."),

    body("author")
        .trim()
        .notEmpty()
        .withMessage("Author name is required."),

    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters."),

    // 2. Fixed key to lowercase 'published_date' to match your schema and controller
    body("published_date") 
        .optional()
        .isISO8601()
        .withMessage("Invalid date format."),
        
    (req, res, next) => {
        // 3. Fixed singular 'error' to plural 'errors'
        const errors = validationResult(req); 
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                // 4. Fixed typo from '.arry()' to '.array()'
                errors: errors.array() 
            });
        }
        next();
    }
];

module.exports = { validateBook };
