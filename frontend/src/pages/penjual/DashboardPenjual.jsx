import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import "../../styles/penjual/DashboardPenjual.css";

function DashboardPenjual() {
  const navigate = useNavigate();

  const [dataTernak, setDataTernak] = useState([]);
  const [loading, setLoading] = useState(true);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(angka || 0));
  };

  const getFotoTernak = (foto) => {
    if (!foto) {
      return null;
    }

    if (foto.startsWith("http")) {
      return foto;
    }

    return `http://localhost:5000/uploads/${foto}`;
  };

  const fetchTernak = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/ternak");

      const semuaTernak = response.data || [];

      const ternakPenjual = loggedInUser?.id
        ? semuaTernak.filter((ternak) => ternak.userId === loggedInUser.id)
        : semuaTernak;

      setDataTernak(ternakPenjual);
    } catch (error) {
      console.error("Gagal mengambil data ternak:", error);
      alert("Gagal mengambil data ternak dari database.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTernak = async (id) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menghapus data ternak ini?"
    );

    if (!konfirmasi) return;

    try {
      await api.delete(`/api/ternak/${id}`);

      setDataTernak((prevData) =>
        prevData.filter((ternak) => ternak.id !== id)
      );

      alert("Data ternak berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus data ternak:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Gagal menghapus data ternak."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    fetchTernak();
  }, []);

  return (
    <div className="seller-dashboard">
      <nav className="seller-navbar">
        <div className="seller-logo">
          <div className="seller-logo-box">S</div>
          <h2>
            SIPERA <span>TORAJA</span>
          </h2>
        </div>

        <div className="seller-nav-links">
          <NavLink
            to="/penjual"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Beranda
          </NavLink>

          <NavLink
            to="/penjual/riwayat-ternak"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Riwayat Ternak
          </NavLink>

          <NavLink
            to="/penjual/pesanan"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Pesanan
          </NavLink>

          <NavLink
            to="/penjual/chat"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Chat
          </NavLink>
        <NavLink
          to="/penjual/laporan-masalah"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Laporan
        </NavLink>
         

        <NavLink
          to="/penjual/profil"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Profil
        </NavLink>
        </div>

        <div className="seller-user">
          <div>
            <strong>{loggedInUser?.nama || "Penjual"}</strong>
            <span>Seller</span>
          </div>

          <button type="button" className="seller-logout" onClick={handleLogout}>
            ↪
          </button>
        </div>
      </nav>

      <main className="seller-main">
        <section className="seller-header">
          <div>
            <h1>Dashboard Penjual</h1>
            <p>Kelola data ternak yang kamu jual di SIPERA Toraja.</p>
          </div>

          <Link to="/penjual/tambah-ternak" className="add-button">
            + Tambah Ternak
          </Link>
        </section>

        <section className="seller-table-card">
          <table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Ternak</th>
                <th>Jenis</th>
                <th>Usia</th>
                <th>Stok</th>
                <th>Harga</th>
                <th>Status</th>
                <th className="aksi">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    Memuat data ternak...
                  </td>
                </tr>
              ) : dataTernak.length > 0 ? (
                dataTernak.map((ternak) => {
                  const fotoUrl = getFotoTernak(ternak.foto);

                  return (
                    <tr key={ternak.id}>
                      <td>
                        {fotoUrl ? (
                          <img
                            src={fotoUrl}
                            alt={ternak.nama}
                            className="ternak-photo"
                          />
                        ) : (
                          <div className="ternak-photo-placeholder">
                            No Image
                          </div>
                        )}
                      </td>

                      <td className="ternak-name">{ternak.nama}</td>
                      <td>{ternak.jenis}</td>
                      <td>{ternak.usia}</td>
                      <td>{ternak.stok}</td>
                      <td className="price">{formatRupiah(ternak.harga)}</td>
                      <td>
                        <span className="status-badge">Tersedia</span>
                      </td>

                      <td className="aksi">
                        <div className="action-icon-wrapper">
                          <Link
                            to={`/penjual/edit-ternak/${ternak.id}`}
                            className="action-icon-btn edit-icon-btn"
                            title="Edit ternak"
                          >
                            <i className="fas fa-pen"></i>
                          </Link>

                          <button
                            type="button"
                            className="action-icon-btn delete-icon-btn"
                            onClick={() => handleDeleteTernak(ternak.id)}
                            title="Hapus ternak"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    Belum ada data ternak.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>

      <footer className="seller-footer">
        <div className="footer-brand">
          <div className="seller-logo">
            <div className="seller-logo-box">S</div>
            <h2>
              SIPERA <span>TORAJA</span>
            </h2>
          </div>
          <p>
            Sistem Informasi Penjualan Ternak Toraja. Menghubungkan peternak
            lokal dengan pembeli secara transparan dan efisien.
          </p>
        </div>

        <div>
          <h3>Navigasi</h3>
          <Link to="/penjual">Beranda</Link>
          <Link to="/penjual/riwayat-ternak">Riwayat Ternak</Link>
          <Link to="/penjual/pesanan">Pesanan</Link>
          <Link to="/penjual/chat">Chat</Link>
          <Link to="/penjual/laporan-masalah">Laporan Masalah</Link>
          <Link to="/penjual/profil">Profil</Link>
        </div>

        <div>
          <h3>Hubungi Kami</h3>
          <p>+62 812 3456 7890</p>
          <p>info@sipera-toraja.com</p>
          <p>Toraja Utara, Sulawesi Selatan</p>
        </div>

        <div>
          <h3>Ikuti Kami</h3>
          <div className="socials">
            <span>f</span>
            <span>◎</span>
            <span>𝕏</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardPenjual;