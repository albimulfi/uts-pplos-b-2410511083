const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res) => {
    const authHeader = req.header.authorization;

    if(!authHeader) {
        return res.status(401).json({ message: "Token tidak ada" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token tidak valid" });
        }

        req.user = user;
        next();
    });
};