const express = require("express");
const router = express.Router();

const bloodController = require("../controllers/bloodController");

router.get("/", bloodController.getAll);
router.post("/", bloodController.addStock);

module.exports = router;