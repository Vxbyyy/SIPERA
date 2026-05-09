import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/pembeli/DashboardPembeli.css";

import kerbauImg from "../../assets/kerbau.jpeg";
import kambingImg from "../../assets/kambing.jpeg";
import ayamImg from "../../assets/ayam.jpg";

function DashboardPembeli() {
  const [search, setSearch] = useState("");

  const dataTernak = [
    {
      id: 1,
      nama: "Kerbau Toraja",
      jenis: "Kerbau",
      harga: "Rp 100.000.000",
      usia: "6 Tahun",
      stok: 3,
      lokasi: "Toraja Utara",
      penjual: "Pak Andi",
      gambar: kerbauImg,
    },
    {
      id: 2,
      nama: "Kambing Etawa",
      jenis: "Kambing",
      harga: "Rp 6.000.000",
      usia: "2 Tahun",
      stok: 8,
      lokasi: "Makale",
      penjual: "Bu Sari",
      gambar: kambingImg,
    },
    {
      id: 3,
      nama: "Ayam Kampung",
      jenis: "Ayam",
      harga: "Rp 150.000",
      usia: "6 Bulan",
      stok: 20,
      lokasi: "Rantepao",
      penjual: "Pak Joni",
      gambar: ayamImg,
    },
  ];

  const filteredTernak = dataTernak.filter((ternak) =>
    ternak.nama.toLowerCase().includes(search.toLowerCase()) ||
    ternak.jenis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="buyer-dashboard">
      <nav className="buyer-navbar">
        <div className="buyer-brand">
          <h2>SIPERA</h2>
          <span>Marketplace Ternak Toraja</span>
        </div>

        <div className="buyer-nav-links">
          <Link to="/pembeli">Beranda</Link>
          <Link to="/pembeli/transaksi">Transaksi</Link>
          <Link to="/pembeli/chat">Chat</Link>
          <Link to="/pembeli/profil">Profil</Link>
        </div>

        <Link to="/" className="buyer-logout">Logout</Link>
      </nav>

      <section className="buyer-hero">
        <div>
          <span className="hero-label">Dashboard Pembeli</span>
          <h1>Temukan Ternak Berkualitas</h1>
          <p>Cari, bandingkan, dan pesan ternak langsung dari penjual terpercaya.</p>
        </div>
      </section>

      <section className="search-section">
        <input
          type="text"
          placeholder="Cari ternak: kerbau, kambing, ayam..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>Cari</button>
      </section>

      <section className="buyer-content">
        <div className="section-title">
          <h2>Daftar Ternak Tersedia</h2>
          <p>Pilih ternak yang ingin Anda pesan atau hubungi penjual terlebih dahulu.</p>
        </div>

        <div className="buyer-grid">
          {filteredTernak.map((ternak) => (
            <div className="buyer-card" key={ternak.id}>
              <img src={ternak.gambar} alt={ternak.nama} />

              <div className="buyer-card-content">
                <span className="stock-badge">Stok {ternak.stok}</span>
                <h3>{ternak.nama}</h3>
                <p className="price">{ternak.harga}</p>

                <div className="buyer-info">
                  <p><strong>Jenis:</strong> {ternak.jenis}</p>
                  <p><strong>Usia:</strong> {ternak.usia}</p>
                  <p><strong>Lokasi:</strong> {ternak.lokasi}</p>
                  <p><strong>Penjual:</strong> {ternak.penjual}</p>
                </div>

                <div className="buyer-actions">
                  <Link to={`/pembeli/pesan/${ternak.id}`} className="order-btn">
                    Pesan
                  </Link>

                  <Link to={`/pembeli/chat/${ternak.id}`} className="chat-btn">
                    Chat
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardPembeli;