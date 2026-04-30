const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const bloodRoutes = require("./routes/bloodRoutes");
app.use("/blood", bloodRoutes);

app.listen(process.env.PORT, () => {
    console.log("Blood service berjalan di port " + process.env.PORT);
});