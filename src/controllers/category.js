const { default: slugify } = require("slugify");
const Category = require("../models/category");


function createListCategory(categories, parentId = null) {

    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    }
    else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for (let x of category) {
        categoryList.push({
            _id: x._id,
            name: x.name,
            slug: x.slug,
            children: createListCategory(categories, x._id)
        });
    }
    return categoryList;
}

exports.addCategory = (req, res) => {


    let categoryUrl;


    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
        categoryImage: categoryUrl

    }
    if (req.file) {
        categoryUrl = process.env.API + '/public/' + req.file.filename;
        categoryObj.categoryImage = categoryUrl;
    }


    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    cat = new Category(categoryObj);
    cat.save((err, Category) => {
        if (err)
            return res.status(400).json({ mag: err })
        if (Category)
            return res.status(200).json({ Category: Category })
    })

};




exports.getCategories = (req, res, next) => {
    Category.find({})
        .exec((err, Categories) => {
            if (err) {
                return res.status(400).json({ err });
            }
            if (Categories) {

                const categoryList = createListCategory(Categories);
                return res.status(200).json({ categoryList })
            }
        })
}

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        res.status(400).json({ msg: "admin access denied" });
    }
    next();
};

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        res.status(400).json({ msg: "user access denied" });
    }
    next();
};