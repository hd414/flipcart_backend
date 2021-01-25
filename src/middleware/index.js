var jwt = require('jsonwebtoken');
exports.requireSignIn = (req, res, next) => {
    if (req.headers.auth) {
        const token = req.headers.auth.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;

    }
    else {
        return res.status(400).json({ error: "authorization is required" });
    }
    next();
};