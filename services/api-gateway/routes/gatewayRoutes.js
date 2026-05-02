const express = require("express");
const router = express.Router();
const axios = require("axios");
const { verifyToken } = require("../middleware/authMiddleware");

// auth service
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

router.post("/auth/refresh", async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.AUTH_SERVICE}/auth/refresh`,
            req.body
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Auth service error",
            error: err.response?.data || err.message
         });
    }
});

router.post("/auth/logout", async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.AUTH_SERVICE}/auth/logout`,
            req.body
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Auth service error",
            error: err.response?.data || err.message
         });
    }
});

// donor service
router.get("/donors", verifyToken, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.DONOR_SERVICE}/api/donors`,

            {
                params: req.query
            }
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Donor service error",
            error: err.response?.data || err.message
         });
    }
});

router.post("/donors", verifyToken, async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.DONOR_SERVICE}/api/donors`, 
            req.body
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Donor service error" });
    }
});

// blood service
router.get("/blood", verifyToken, async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.BLOOD_SERVICE}/blood`
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Blood service error" });
    }
});

router.post("/blood", verifyToken, async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.BLOOD_SERVICE}/blood`,
            req.body
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Blood service error" });
    }
});

router.get("/blood-donor", verifyToken, async (req, res) => {
    const response = await axios.get(
        `${process.env.BLOOD_SERVICE}/blood-with-donor`
    );
    res.json(response.data);
});

module.exports = router;