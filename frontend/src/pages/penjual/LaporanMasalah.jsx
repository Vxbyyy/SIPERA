import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
import "../../styles/penjual/LaporanMasalah.css";

function LaporanMasalah() {
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLaporan = async (e) => {
    e.preventDefault();

    if (!kategori || !deskripsi) {
      alert("Silakan lengkapi semua data.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/laporan", {
        kategori,
        deskripsi,
      });

      alert("Laporan berhasil dikirim.");

      setKategori("");
      setDeskripsi("");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Gagal mengirim laporan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lapor-page">
      <div className="lapor-card">

        <div className="lapor-header">
          <h1>Laporan Masalah</h1>

          <p>
            Laporkan kendala yang Anda alami selama menggunakan
            SIPERA Toraja.
          </p>
        </div>

        <form onSubmit={submitLaporan}>

          <div className="form-group">
            <label>Kategori Masalah</label>

            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              required
            >
              <option value="">
                Pilih kategori
              </option>

              <option value="Akun">
                Akun
              </option>

              <option value="Transaksi">
                Transaksi
              </option>

              <option value="Pembeli">
                Pembeli
              </option>

              <option value="Ternak">
                Ternak
              </option>

              <option value="Chat">
                Chat
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Deskripsi Masalah</label>

            <textarea
              value={deskripsi}
              onChange={(e) =>
                setDeskripsi(e.target.value)
              }
              rows="6"
              placeholder="Jelaskan masalah yang Anda alami..."
              required
            />
          </div>

          <div className="lapor-actions">

            <button
              type="submit"
              className="btn-kirim"
              disabled={loading}
            >
              {loading
                ? "Mengirim..."
                : "Kirim Laporan"}
            </button>

            <Link
              to="/penjual"
              className="btn-kembali"
            >
              Kembali ke Dashboard
            </Link>

          </div>
        </form>

      </div>
    </div>
  );
}

export default LaporanMasalah;