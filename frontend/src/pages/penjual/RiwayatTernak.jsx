import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/penjual/RiwayatTernak.css";

import kerbauImg from "../../assets/kerbau.jpeg";
import kambingImg from "../../assets/kambing.jpeg";

function RiwayatTernak() {
  const navigate = useNavigate();
  const [selectedTernak, setSelectedTernak] = useState(null);

  const riwayatTernak = [
    {
      id: 1,
      nama: "Kerbau Toraja",
      jenis: "Kerbau",
      harga: "Rp 100.000.000",
      usia: "6 Tahun",
      kondisi: "Sehat",
      stokAwal: 5,
      stokTersisa: 2,
      status: "Aktif",
      tanggal: "12 April 2026",
      lokasi: "Toraja Utara",
      deskripsi: "Kerbau sehat untuk kebutuhan adat Toraja",
      gambar: kerbauImg,
    },
    {
      id: 2,
      nama: "Kambing Etawa",
      jenis: "Kambing",
      harga: "Rp 6.000.000",
      usia: "2 Tahun",
      kondisi: "Sehat",
      stokAwal: 8,
      stokTersisa: 0,
      status: "Terjual",
      tanggal: "10 April 2026",
      lokasi: "Makale",
      deskripsi: "Kambing aktif dan siap dijual",
      gambar: kambingImg,
    },
  ];

  return (
    <div className="riwayat-page">
      <button
        type="button"
        className="back-floating"
        onClick={() => navigate(-1)}
      >
        <i className="fas fa-arrow-left"></i>
      </button>

      <div className="riwayat-container">
        <div className="riwayat-header">
          <div className="riwayat-header-text">
            <span className="page-label">Riwayat Penjual</span>
            <h1>Riwayat Ternak</h1>
            <p>Kelola dan pantau semua data ternak yang pernah Anda tambahkan.</p>
          </div>
        </div>

        <div className="summary">
          <div className="summary-card">
            <span>Total Ternak</span>
            <h3>{riwayatTernak.length}</h3>
          </div>

          <div className="summary-card">
            <span>Ternak Aktif</span>
            <h3>{riwayatTernak.filter((t) => t.status === "Aktif").length}</h3>
          </div>

          <div className="summary-card">
            <span>Terjual</span>
            <h3>{riwayatTernak.filter((t) => t.status === "Terjual").length}</h3>
          </div>
        </div>

        <div className="history-card">
          <div className="history-header">
            <h2>Daftar Riwayat</h2>
            <p>Klik detail untuk melihat informasi lengkap ternak.</p>
          </div>

          <div className="history-list">
            {riwayatTernak.map((item, index) => (
              <div className="history-item" key={item.id}>
                <div className="history-number">{index + 1}</div>

                <img src={item.gambar} alt={item.nama} className="history-img" />

                <div className="history-info">
                  <h3>{item.nama}</h3>
                  <p>{item.deskripsi}</p>
                  <span>
                    {item.jenis} • {item.tanggal}
                  </span>
                </div>

                <div className="history-price">
                  <strong>{item.harga}</strong>
                  <span>Stok: {item.stokTersisa}</span>
                </div>

                <span
                  className={
                    item.status === "Aktif" ? "badge aktif" : "badge terjual"
                  }
                >
                  {item.status}
                </span>

                <button
                  type="button"
                  className="detail-btn"
                  onClick={() => setSelectedTernak(item)}
                >
                  Detail
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedTernak && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedTernak(null)}
          >
            <div className="detail-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="close-btn"
                onClick={() => setSelectedTernak(null)}
              >
                <i className="fas fa-times"></i>
              </button>

              <img
                src={selectedTernak.gambar}
                alt={selectedTernak.nama}
                className="detail-img"
              />

              <div className="detail-content">
                <span className="page-label">Detail Ternak</span>
                <h2>{selectedTernak.nama}</h2>
                <p className="detail-desc">{selectedTernak.deskripsi}</p>

                <div className="detail-info-grid">
                  <div>
                    <span>Jenis</span>
                    <strong>{selectedTernak.jenis}</strong>
                  </div>
                  <div>
                    <span>Harga</span>
                    <strong>{selectedTernak.harga}</strong>
                  </div>
                  <div>
                    <span>Usia</span>
                    <strong>{selectedTernak.usia}</strong>
                  </div>
                  <div>
                    <span>Kondisi</span>
                    <strong>{selectedTernak.kondisi}</strong>
                  </div>
                  <div>
                    <span>Stok Awal</span>
                    <strong>{selectedTernak.stokAwal}</strong>
                  </div>
                  <div>
                    <span>Stok Tersisa</span>
                    <strong>{selectedTernak.stokTersisa}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>{selectedTernak.status}</strong>
                  </div>
                  <div>
                    <span>Lokasi</span>
                    <strong>{selectedTernak.lokasi}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RiwayatTernak;