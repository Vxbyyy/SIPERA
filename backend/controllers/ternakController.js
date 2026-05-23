const Ternak = require("../models/Ternak");

// GET semua data ternak
exports.getAll = async (req, res) => {
  try {
    const data = await Ternak.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data ternak",
      error: error.message,
    });
  }
};

// POST tambah data ternak + foto
exports.create = async (req, res) => {
  try {
    const {
      nama,
      jenis,
      harga,
      usia,
      kondisi,
      stok,
      lokasi,
      deskripsi,
    } = req.body;

    const foto = req.file ? req.file.filename : null;

    const data = await Ternak.create({
      nama,
      jenis,
      harga,
      usia,
      kondisi,
      stok,
      lokasi,
      deskripsi,
      userId: req.user ? req.user.id : null,
      foto,
    });

    res.status(201).json({
      message: "Data ternak berhasil ditambahkan",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan data ternak",
      error: error.message,
    });
  }
};

// DELETE hapus data ternak
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Ternak.findByPk(id);

    if (!data) {
      return res.status(404).json({
        message: "Data ternak tidak ditemukan",
      });
    }

    await data.destroy();

    res.status(200).json({
      message: "Data ternak berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus data ternak",
      error: error.message,
    });
  }
};