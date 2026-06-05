const express = require("express");
const router = express.Router();

const {
  getPesananPenjual,
  getPesananPembeli,
  createPesanan,
  updateStatusPesanan,
} = require("../controllers/pesananController");

const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

// Penjual melihat pesanan masuk
router.get(
  "/penjual",
  verifyToken,
  allowRoles("penjual"),
  getPesananPenjual
);

// Pembeli melihat transaksi/pesanan miliknya
router.get(
  "/pembeli",
  verifyToken,
  allowRoles("pembeli"),
  getPesananPembeli
);

// Pembeli membuat pesanan
router.post(
  "/",
  verifyToken,
  allowRoles("pembeli"),
  createPesanan
);

// Penjual mengubah status pesanan
router.patch(
  "/:id/status",
  verifyToken,
  allowRoles("penjual"),
  updateStatusPesanan
);

module.exports = router;