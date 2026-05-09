const express = require("express");
const cors = require("cors");

require("./models/Ternak");
require("./models/User");

const ternakRoutes = require("./routes/ternakRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ternak", ternakRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;