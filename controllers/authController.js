const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let users = [];

exports.register = async (req, res) => {
    const { username, password } = req.body;

    const hashed =await bcrypt.hash(password, 10);

    users.push({
        id: users.length + 1,
        username,
        password: hashed
    });

    res.json({ message: "Register berhasil" });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = users.find (u => u.username === username);
    if (!user) 
        return res.status(404).json({ message: "User tidak ditemukan" });

    const valid = await bcrypt.compare(password, user.password); 
    if (!valid)
        return res.status(401).json({ message: "Password salah" });

    const accesToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({ accesToken, refreshToken });
};