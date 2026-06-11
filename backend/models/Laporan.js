const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Laporan = sequelize.define("Laporan", {
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "Menunggu",
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Laporan;