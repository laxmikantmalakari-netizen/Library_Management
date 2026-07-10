const {body, validationResult} = require('express-validator');

const validatebook = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage("Book title is required.")
        .isLength({min: 3})
        .withMessage("Title must contain at least 3 characters."),
        
        body("author")
        .trim()
        .notEmpty()
        .withMessage("Author name is required."),
        
        body("description")
        .optional()
        .isLength({max: 500})
        .withMessage("Description cannot exceed 500 characters."),

        body("published_Date")
        .optional()
        .isISO8601()
        .withMessage("Invalid date format."),
        (req,res,next)=>{
            const error=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    success:false,
                    errors:errors.arry()
                });

            }
            next();
        }
];
module.exports={validateBook};





