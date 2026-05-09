import { Link } from "react-router-dom";
import "../../styles/umum/LandingPage.css";

import kerbauImg from "../../assets/kerbau.jpeg";
import babiImg from "../../assets/babi.jpg";
import kambingImg from "../../assets/kambing.jpeg";
import ayamImg from "../../assets/ayam.jpg";
import rumahImg from "../../assets/hero.jpeg";

function LandingPage() {
  const daftarTernak = [
    {
      id: 1,
      nama: "Kerbau Toraja",
      harga: "Rp 100.000.000",
      gambar: kerbauImg,
    },
    {
      id: 2,
      nama: "Babi",
      harga: "Rp 8.000.000",
      gambar: babiImg,
    },
    {
      id: 3,
      nama: "Kambing",
      harga: "Rp 6.000.000",
      gambar: kambingImg,
    },
    {
      id: 4,
      nama: "Ayam Kampung",
      harga: "Rp 150.000",
      gambar: ayamImg,
    },
  ];

  return (
    <div className="landing-page">
      <section
        className="hero-banner"
        style={{
          backgroundImage: `url(${rumahImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="login-box">
          <h2>SIPERA</h2>
          <p>Sistem Informasi Penjualan Ternak</p>
          <div className="login-actions">
            <Link to="/login">Login</Link>
            <Link to="/register">Daftar</Link>
          </div>
        </div>
      </section>

      <section className="animal-section">
        <h3>Daftar Hewan Ternak</h3>
        <p>Pembeli dapat melihat ternak dan harga sebelum melakukan pemesanan</p>

        <div className="animal-grid">
          {daftarTernak.map((ternak) => (
            <div className="animal-card" key={ternak.id}>
              <img src={ternak.gambar} alt={ternak.nama} />
              <h4>{ternak.nama}</h4>
              <p className="animal-price">{ternak.harga}</p>

              <Link to="/login" className="order-button">
                Pesan
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="info-card">
          <h3>Selamat Datang di SIPERA</h3>
          <p>
            SIPERA membantu pembeli melihat daftar ternak, harga, dan informasi
            awal sebelum melakukan pemesanan. Untuk memesan ternak, pembeli
            harus registrasi dan login terlebih dahulu.
          </p>
        </div>

        <div className="info-card">
          <h3>Alur Pemesanan</h3>
          <ul>
            <li>Lihat daftar ternak dan harga</li>
            <li>Klik tombol Pesan</li>
            <li>Registrasi atau login sebagai pembeli</li>
            <li>Masuk ke dashboard pembeli</li>
            <li>Lakukan pemesanan ternak</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;