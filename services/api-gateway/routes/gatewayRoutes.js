const express = require("express");
const router = express.Router();
const axios = require("axios");

// auth
router.post("/auth/register", async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.AUTH_SERVICE}/auth/register`,
            req.body
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Auth service error" });
    }
});

router.post("/auth/login", async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.AUTH_SERVICE}/auth/login`,
            req.body
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Auth service error" });
    }
});
