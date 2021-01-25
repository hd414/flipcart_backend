const express = require("express");
const { signUp, signIn, requireSignIn } = require("../controllers/auth");
const router = express.Router();
const User = require("../models/user");

const { validateRequests, isRequestValidated, SigninvalidateRequests } = require("../validators/auth.validate");


router.post("/signin", SigninvalidateRequests, isRequestValidated, signIn);



router.post("/signup", validateRequests, isRequestValidated, signUp);


// router.post("/profile", requireSignIn, (req, res) => {
//     res.status(200).json({ msg: "profile of user" })
// });


module.exports = router; 