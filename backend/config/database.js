const { Sequelize } = require("sequelize");

const db = new Sequelize("sipera_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port:3306,
});

module.exports = db;