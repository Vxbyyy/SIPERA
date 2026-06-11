const Laporan = require("../models/Laporan");

exports.createLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.create({
      kategori: req.body.kategori,
      deskripsi: req.body.deskripsi,

      // sementara ambil dari body
      userId: req.body.userId,

      status: "Menunggu",
    });

    res.status(201).json(laporan);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal membuat laporan",
    });
  }
};

exports.getAllLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(laporan);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil laporan",
    });
  }
};