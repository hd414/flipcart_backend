const { check } = require('express-validator');
const { validationResult } = require("express-validator");
exports.validateRequests = [
    check("firstName")
        .notEmpty()
        .withMessage("firstname is required"),
    check("lastName")
        .notEmpty()
        .withMessage("lastname is required"),
    check("email")
        .isEmail()
        .withMessage("not a valid email")
    ,
    check("password")
        .isLength({ min: 6 })
        .withMessage("password must contain atleast 6 characters")
];

exports.SigninvalidateRequests = [

    check("email")
        .isEmail()
        .withMessage("not a valid email")
    ,
    check("password")
        .isLength({ min: 6 })
        .withMessage("password must contain atleast 6 characters")
];


exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}