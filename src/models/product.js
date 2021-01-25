const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,

        }
        ,

        slug: {
            type: String,
            required: true,
            trim: true,
            unique: true,

        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true,

        },
        description: {
            type: String,
            required: true,
            trim: true,

        },
        offer: {
            type: String,
        }
        , productImages: [
            { img: { type: String } }
        ],
        reviews: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            review: String
        }],

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        createdby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        updatedBy: Date,
    }, {
    timestamps: true
}
);



module.exports = mongoose.model('Product', productSchema);