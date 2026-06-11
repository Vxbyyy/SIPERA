const express = require("express");
const router = express.Router();

const {
  createLaporan,
  getAllLaporan,
} = require("../controllers/laporanController");

router.post("/", createLaporan);

router.get("/", getAllLaporan);

module.exports = router;