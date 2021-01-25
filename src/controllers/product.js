const Product = require("../models/product");
const shortid = require("shortid");
const { default: slugify } = require("slugify");
exports.createProduct = (req, res) => {
    // res.status(200).json({ file: req.files, body: req.body })

    const { name, price, description, category, quantity, createdby } = req.body;

    let productImages = [];

    if (req.files.length > 0) {
        productImages = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        slug: slugify(name),
        name, price, description, category, quantity,
        createdby: req.user._id,
        productImages
    });

    product.save(((err, product) => {
        if (err)
            return res.status(400).json({ err });
        if (product) {
            res.status(200).json({ product })
        }
    }))

};