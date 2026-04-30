const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const gatewayRoutes = require("./routes/gatewayRoutes");
app.use("/", gatewayRoutes);

app.listen(process.env.PORT, () => {
    console.log("API Gateway jalan di port " + process.env.PORT);
});