import { Link } from "react-router-dom";
import "../../styles/penjual/DashboardPenjual.css";

import kerbauImg from "../../assets/kerbau.jpeg";
import kambingImg from "../../assets/kambing.jpeg";
import ayamImg from "../../assets/ayam.jpg";

function DashboardPenjual() {
  const dataTernak = [
    {
      id: 1,
      nama: "Kerbau Toraja",
      jenis: "Kerbau",
      harga: "Rp 100.000.000",
      usia: "6 Tahun",
      stok: 3,
      deskripsi: "Kerbau sehat dan cocok untuk kebutuhan adat Toraja.",
      gambar: kerbauImg,
    },
    {
      id: 2,
      nama: "Kambing Etawa",
      jenis: "Kambing",
      harga: "Rp 6.000.000",
      usia: "2 Tahun",
      stok: 8,
      deskripsi: "Kambing sehat, aktif, dan siap dijual.",
      gambar: kambingImg,
    },
    {
      id: 3,
      nama: "Ayam Kampung",
      jenis: "Ayam",
      harga: "Rp 150.000",
      usia: "6 Bulan",
      stok: 20,
      deskripsi: "Ayam kampung sehat dengan stok tersedia.",
      gambar: ayamImg,
    },
  ];

  return (
    <div className="seller-dashboard">
      <nav className="website-navbar">
        <div className="brand">
          <h2>SIPERA</h2>
          <span>Seller Center</span>
        </div>

        <div className="nav-links">
          <Link to="/penjual">Beranda</Link>
          <Link to="/penjual/riwayat-ternak">Riwayat Ternak</Link>
          <Link to="/penjual/pesanan">Pesanan</Link>
          <Link to="/penjual/aduan">Aduan</Link>
          <Link to="/penjual/profil">Profil</Link>
        </div>

        <Link to="/" className="logout-btn">
          Logout
        </Link>
      </nav>

      <header className="seller-header">
        <div>
          <h1>Kelola Ternak Jualanmu</h1>
          <p>Tambah, pantau, dan kelola data ternak yang tersedia di SIPERA.</p>
        </div>

        <Link to="/penjual/tambah-ternak" className="add-button">
          + Tambah Ternak
        </Link>
      </header>

      <section className="ternak-section">
        <div className="section-title">
          <h2>Daftar Ternak Saya</h2>
          <p>Produk ternak yang sedang kamu tampilkan kepada calon pembeli.</p>
        </div>

        <div className="ternak-grid">
          {dataTernak.map((ternak) => (
            <div className="ternak-card" key={ternak.id}>
              <img src={ternak.gambar} alt={ternak.nama} />

              <div className="ternak-content">
                <h3>{ternak.nama}</h3>
                <p>
                  <strong>Jenis:</strong> {ternak.jenis}
                </p>
                <p>
                  <strong>Harga:</strong> {ternak.harga}
                </p>
                <p>
                  <strong>Usia:</strong> {ternak.usia}
                </p>
                <p>
                  <strong>Stok:</strong> {ternak.stok}
                </p>
                <p className="desc">{ternak.deskripsi}</p>

                <div className="card-actions">
                  <Link
                    to={`/penjual/edit-ternak/${ternak.id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>

                  <button className="delete-btn">Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardPenjual;