const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const rateLimit = require("express-rate-limit");

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 mnt
    max: 10, // max 10 request
    message: { message: "Terlalu banyak request, coba lagi nanti" }
});

app.use(limiter);

const gatewayRoutes = require("./routes/gatewayRoutes");
app.use("/", gatewayRoutes);

app.listen(process.env.PORT, () => {
    console.log("API Gateway jalan di port " + process.env.PORT);
});