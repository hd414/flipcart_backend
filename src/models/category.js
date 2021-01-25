const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const categoryShema = new mongoose.Schema(
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
        parentid: {
            type: String
        }
    }, {
    timestamps: true
}
);



module.exports = mongoose.model('User', userShema);