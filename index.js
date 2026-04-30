const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log("Auth Service Berjalan di Port " + process.env.PORT);
});