const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../app");
const db = require("../config/database");
const User = require("../models/user");

describe("Unit Test Modul Admin", () => {

  let adminToken = "";
  let userId = "";

  beforeAll(async () => {

    await db.sync();

    const adminEmail = "admin@test.com";

    let admin = await User.findOne({
      where: {
        email: adminEmail,
      },
    });

    if (!admin) {

      const password = await bcrypt.hash("admin123", 10);

      admin = await User.create({
        nama: "Admin Test",
        email: adminEmail,
        password,
        role: "admin",
      });

    }

    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: adminEmail,
        password: "admin123",
      });

    adminToken = login.body.token;

    const emailUser = `user${Date.now()}@test.com`;

    const register = await request(app)
      .post("/api/auth/register")
      .send({
        nama: "User Testing",
        email: emailUser,
        password: "123456",
        role: "pembeli",
      });

    userId = register.body.user.id;

  });

  test("GET semua user", async () => {

    const response = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

  });

  test("GET semua ternak", async () => {

    const response = await request(app)
      .get("/api/admin/ternak")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

  });

  test("PATCH update status berhasil", async () => {

    const response = await request(app)
      .patch(`/api/admin/users/${userId}/status`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        status: "Ditangguhkan",
      });

    expect(response.statusCode).toBe(200);

  });

  test("PATCH status tidak valid", async () => {

    const response = await request(app)
      .patch(`/api/admin/users/${userId}/status`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        status: "Salah",
      });

    expect(response.statusCode).toBe(400);

  });

  test("PATCH user tidak ditemukan", async () => {

    const response = await request(app)
      .patch("/api/admin/users/999999/status")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        status: "Aktif",
      });

    expect(response.statusCode).toBe(404);

  });

  test("DELETE user berhasil", async () => {

    const response = await request(app)
      .delete(`/api/admin/users/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);

  });

  test("DELETE user tidak ditemukan", async () => {

    const response = await request(app)
      .delete("/api/admin/users/999999")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(404);

  });

  test("DELETE admin ditolak", async () => {

    const admin = await User.findOne({
      where: {
        email: "admin@test.com",
      },
    });

    const response = await request(app)
      .delete(`/api/admin/users/${admin.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(403);

  });

  afterAll(async () => {
    await db.close();
  });

});