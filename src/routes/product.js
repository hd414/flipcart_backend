const express = require("express");

const { adminMiddleware } = require("../controllers/category");
const { createProduct } = require("../controllers/product");
const { requireSignIn } = require("../middleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});
const upload = multer({ storage });

router.post("/product/create", requireSignIn, adminMiddleware, upload.array('productImage'), createProduct);
// router.get('/category/get', getCategories);

module.exports = router; 