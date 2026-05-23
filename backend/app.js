const express = require("express");
const cors = require("cors");
const path = require("path");

require("./models/Ternak");
require("./models/user");

const ternakRoutes = require("./routes/ternakRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// agar file foto di folder uploads bisa diakses dari browser/frontend
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/ternak", ternakRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;