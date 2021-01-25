const express = require("express");
const { addToCart } = require("../controllers/cart");

const { userMiddleware } = require("../controllers/category");
const { requireSignIn } = require("../middleware");
const router = express.Router();


router.post("/user/cart/add", requireSignIn, userMiddleware, addToCart);


module.exports = router; 