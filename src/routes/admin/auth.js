const express = require("express");
const { signUp, signIn, requireSignIn } = require("../../controllers/admin/auth");
const { SigninvalidateRequests, isRequestValidated, validateRequests } = require("../../validators/auth.validate");
const router = express.Router();



router.post("/admin/signin", SigninvalidateRequests, isRequestValidated, signIn);

router.post("/admin/signup", validateRequests, isRequestValidated, signUp);





module.exports = router; 