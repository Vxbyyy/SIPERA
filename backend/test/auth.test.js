const request = require("supertest");
const app = require("../app");
const db = require("../config/database");

require("../models/User");

describe("Unit Test Modul Auth", () => {

  const userData = {
    nama: "Suci Test",
    email: "suci@test.com",
    password: "123456",
    role: "pembeli",
    noTelepon: "08123456789",
    alamat: "Toraja"
  };

  beforeAll(async () => {
    await db.sync();
  });

  test("POST /api/auth/register berhasil", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(response.statusCode).toBe(201);
  });

  test("POST /api/auth/login berhasil", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: userData.email,
        password: userData.password
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  afterAll(async () => {
    await db.close();
  });

});