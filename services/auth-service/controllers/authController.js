const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");

let users = [];
let refreshTokens = [];

exports.register = async (req, res) => {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

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

    const accessToken = jwt.sign(
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

    res.json({ accessToken, refreshToken });
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

        const newAccessToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.json({ accessToken: newAccessToken });
    });
};

exports.logout = (req, res) => {
    const { token } = req.body;

    refreshTokens = refreshTokens.filter(t => t !== token);

    res.json({ message: "Anda Berhasil Logout" });
};

// lewat github
exports.githubLogin = (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = "http://localhost:3001/auth/github/callback";

    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

    res.redirect(url);
}

exports.githubCallback = async (req, res) => {
    const code = req.query.code;

    try {
        const tokenRes = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            {
                headers: { Accept: "application/json" }
            }
        );

        const accesTokenGitHub = tokenRes.data.access_token;

        const userRes = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `token ${accesTokenGitHub}`,
                Accept: "application/json"
            }
        });

        const user = userRes.data;

        try {
            console.log("KIRIM KE LARAVEL:", user.login);

            const response = await axios.post("http://127.0.0.1:8000/api/oauth-user", {
                github_id: user.id,
                username: user.login,
                email: user.email || `${user.login}@github.com`,
                avatar: user.avatar_url
            });

            console.log("BERHASIL SIMPAN:", response.data);

        } catch (err) {
            console.log("ERROR LARAVEL:", err.response?.data || err.message);
        }

        // buat jwt yang lokal
        const accessToken = jwt.sign(
            { id: user.id, username: user.login },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.json({
            message: "Login ke Github berhasil",
            User: user.login,
            token: accessToken
        });

    } catch (err) {
        console.log("ERROR OAUTH:", err.response?.data || err.message);
        res.status(500).json({ message: "OAuth gagal", error: err.message });
    }
};