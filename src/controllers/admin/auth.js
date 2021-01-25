const User = require("../../models/user");
var jwt = require('jsonwebtoken');

exports.signUp = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (user && user.role === 'admin') {
                return res.status(404).json({
                    message: "admin already registered"
                });
            }
            const { firstName, lastName, email, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                role: 'admin',
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
                        msg: 'admin created succesfully'
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
                if (user.authenticate(req.body.password) && user.role === 'admin') {

                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
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


exports.requireSignIn = (req, res, next) => {
    const token = req.headers.auth.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
    next();
};