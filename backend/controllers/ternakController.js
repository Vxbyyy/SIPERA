const Ternak = require("../models/Ternak");

// GET semua data
exports.getAll = async (req, res) => {
  const data = await Ternak.findAll();
  res.json(data);
};

// POST tambah data
exports.create = async (req, res) => {
  const data = await Ternak.create(req.body);
  res.json(data);
};