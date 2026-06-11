import { useState } from "react";
import api from "../../api/axiosConfig";

function LaporMasalah() {
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const submitLaporan = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/laporan", {
        kategori,
        deskripsi,
      });

      alert("Laporan berhasil dikirim");
      setKategori("");
      setDeskripsi("");
    } catch (err) {
      alert("Gagal mengirim laporan");
    }
  };

  return (
    <form onSubmit={submitLaporan}>
      <h1>Lapor Masalah</h1>

      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
      >
        <option value="">Pilih kategori</option>
        <option>Akun</option>
        <option>Transaksi</option>
        <option>Ternak</option>
        <option>Chat</option>
      </select>

      <textarea
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
        placeholder="Jelaskan masalah..."
      />

      <button type="submit">
        Kirim Laporan
      </button>
    </form>
  );
}

export default LaporMasalah;