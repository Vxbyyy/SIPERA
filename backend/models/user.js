const { DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("pembeli", "penjual"),
    allowNull: false,
  },

  noTelepon: {
    type: DataTypes.STRING,
  },

  alamat: {
    type: DataTypes.TEXT,
  },
});

module.exports = User;