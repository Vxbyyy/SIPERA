const express = require("express");
const router = express.Router();

const {
  createLaporan,
  getAllLaporan,
  balasLaporan,
  getLaporanUser,
} = require("../controllers/laporanController");

// tambah laporan
router.post("/", createLaporan);

// semua laporan admin
router.get("/", getAllLaporan);

// laporan milik user
router.get("/user/:userId", getLaporanUser);

// balas laporan admin
router.patch("/:id/balas", balasLaporan);

module.exports = router;