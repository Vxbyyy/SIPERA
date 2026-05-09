const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Ternak = db.define("Ternak", {
  nama: DataTypes.STRING,
  jenis: DataTypes.STRING,
  harga: DataTypes.INTEGER,
  usia: DataTypes.STRING,
  kondisi: DataTypes.STRING,
  stok: DataTypes.INTEGER,
  lokasi: DataTypes.STRING,
  deskripsi: DataTypes.TEXT,
});

module.exports = Ternak;