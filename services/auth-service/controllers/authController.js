const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let users = [];
let refreshTokens = [];

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

    refreshTokens.push(refreshToken);

    res.json({ accesToken, refreshToken });
};

exports.refresh = (req, res) => {
    const { token } = req.body;

    if (!token)
        return res.status(401).json({ message: "Tokend tidak ada" });

    if (!refreshTokens.includes(token)) {
        return res.status(403).json({ message: "Refresh token tidak valid "});
    }

    jwt.verify (token, process.env.JWT_SECRET, (err, user) => {
        if (err) 
            return res.status(403).json({ message: "Token invalid" });

        const newAccesToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.json({ accesToken: newAccesToken });
    });
};

exports.logout = (req, res) => {
    const { token } = req.body;

    refreshTokens = refreshTokens.filter(t => t !== token);

    res.json({ message: "Anda Berhasil Logout" });
};