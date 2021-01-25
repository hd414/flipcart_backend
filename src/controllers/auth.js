const User = require("../models/user");
var jwt = require('jsonwebtoken');


exports.signUp = (req, res) => {




    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (user && user.role === 'user') {
                return res.status(404).json({
                    message: "user already registered"
                });
            }
            const { firstName, lastName, email, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                userName: Math.random().toString()
            });
            _user.save((err, data) => {
                if (err) {
                    return res.status(404).json({
                        message: "somethng went wrong"
                    });
                }
                if (data) {
                    return res.status(200).json({
                        user: data
                    });
                }
            })

        })

};


exports.signIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    message: err
                });
            }
            if (user) {
                if (user.authenticate(req.body.password)) {

                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    return res.status(200).json({
                        token,
                        user: { _id, firstName, lastName, email, role, fullName }

                    });
                }

                else {
                    return res.status(404).json({
                        message: "password is wrong"
                    });
                }

            }
            else {
                return res.status(404).json({
                    message: "User does not exist"
                });
            }


        })

};


