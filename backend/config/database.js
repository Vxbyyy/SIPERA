require("dotenv").config();

const { Sequelize } = require("sequelize");

console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_NAME =", process.env.DB_NAME);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_PORT =", process.env.DB_PORT);

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: false,
};

// Hanya gunakan SSL jika bukan localhost
if (process.env.DB_HOST !== "localhost") {
  config.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  config
);

module.exports = db;