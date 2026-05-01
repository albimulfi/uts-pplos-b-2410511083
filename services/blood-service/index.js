const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const bloodRoutes = require("./routes/bloodRoutes");
app.use("/blood", bloodRoutes);

app.get("/blood-with-donor", async (req, res) => {
    try {
        const donorResponse = await axios.get(
            "http://127.0.0.1:8000/api/donors",
            {
                headers: {
                    Authorization: req.headers.authorization
                }
            }
        );

        res.json({
            message: "Data darah + donor",
            donors: donorResponse.data
        });

    } catch (err) {
        console.log("ERROR DONOR SERVICE:", err.message);
        console.log("DETAIL:", err.response?.data);

        res.status(500).json({
            message: "Gagal mengambil data donor",
            error: err.response?.data || err.message
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log("Blood service berjalan di port " + process.env.PORT);
});