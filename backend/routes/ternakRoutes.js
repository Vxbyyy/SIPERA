const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const controller = require("../controllers/ternakController");

const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Semua user boleh melihat daftar ternak
router.get("/", controller.getAll);

// Hanya penjual yang boleh menambahkan ternak
router.post(
  "/",
  verifyToken,
  allowRoles("penjual"),
  upload.single("foto"),
  controller.create
);

// Hanya penjual yang boleh menghapus ternak
router.delete(
  "/:id",
  verifyToken,
  allowRoles("penjual"),
  controller.remove
);

module.exports = router;