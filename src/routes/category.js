const express = require("express");

const { addCategory, getCategories, adminMiddleware } = require("../controllers/category");
const { requireSignIn } = require("../middleware");
const router = express.Router();
const Category = require("../models/category");

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

router.post("/category/create", requireSignIn, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/get', getCategories);

module.exports = router; 