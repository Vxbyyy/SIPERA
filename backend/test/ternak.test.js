const request = require("supertest");
const app = require("../app");
const db = require("../config/database");

describe("Unit Test Modul Ternak", () => {
  test("GET /api/ternak berhasil menampilkan data ternak", async () => {
    const response = await request(app).get("/api/ternak");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/ternak berhasil menambahkan data ternak", async () => {
    const response = await request(app)
      .post("/api/ternak")
      .send({
        nama: "Kerbau Test",
        jenis: "Kerbau",
        harga: 100000000,
        usia: "6 Tahun",
        kondisi: "Sehat",
        stok: 2,
        lokasi: "Toraja Utara",
        deskripsi: "Data ternak untuk unit test",
      });

    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await db.close();
  });
});