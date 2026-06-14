import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import "../../styles/pembeli/TransaksiPembeli.css";

function TransaksiPembeli() {
  const navigate = useNavigate();

  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(angka || 0));
  };

  const fetchPesanan = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/pesanan/pembeli");

      setTransaksi(response.data || []);
    } catch (error) {
      console.error("Gagal mengambil transaksi:", error);

      alert(
        error.response?.data?.message ||
          "Gagal mengambil data transaksi."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPesanan();
  }, []);

  // Statistik
  const jumlahMenunggu = transaksi.filter(
    (item) => item.status === "Menunggu Pembayaran"
  ).length;

  const jumlahDiproses = transaksi.filter(
    (item) => item.status === "Diproses"
  ).length;

  const jumlahSelesai = transaksi.filter(
    (item) => item.status === "Selesai"
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="buyer-transaction-page">
      <nav className="buyer-transaction-navbar">
        <div className="buyer-transaction-logo">
          <div className="buyer-transaction-logo-box">S</div>

          <h2>
            SIPERA <span>TORAJA</span>
          </h2>
        </div>

        <div className="buyer-transaction-nav-links">
          <NavLink to="/pembeli" end>
            Beranda
          </NavLink>

          <NavLink to="/pembeli/transaksi">
            Transaksi
          </NavLink>

          <NavLink to="/pembeli/chat">
            Chat
          </NavLink>

          <NavLink to="/pembeli/profil">
            Profil
          </NavLink>
        </div>

        <div className="buyer-transaction-user">
          <div>
            <strong>
              {loggedInUser?.nama || "Pembeli"}
            </strong>
            <span>Buyer</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
          >
            ↪
          </button>
        </div>
      </nav>

      <main className="buyer-transaction-main">
        <section className="buyer-transaction-header">
          <h1>Transaksi Saya</h1>
          <p>
            Pantau status transaksi pembelian
            ternak Anda di SIPERA.
          </p>
        </section>

        {/* Statistik */}
        <section className="buyer-transaction-stats">
          <div className="transaction-stat-card">
            <div className="transaction-stat-icon pending">
              <i className="fas fa-wallet"></i>
            </div>

            <div>
              <p>Menunggu</p>
              <h3>{jumlahMenunggu}</h3>
            </div>
          </div>

          <div className="transaction-stat-card">
            <div className="transaction-stat-icon process">
              <i className="fas fa-truck"></i>
            </div>

            <div>
              <p>Diproses</p>
              <h3>{jumlahDiproses}</h3>
            </div>
          </div>

          <div className="transaction-stat-card">
            <div className="transaction-stat-icon done">
              <i className="fas fa-check-circle"></i>
            </div>

            <div>
              <p>Selesai</p>
              <h3>{jumlahSelesai}</h3>
            </div>
          </div>
        </section>

        {/* Riwayat */}
        <section className="buyer-transaction-card">
          <div className="buyer-transaction-card-title">
            <i className="fas fa-file-invoice"></i>
            <h2>Riwayat Transaksi</h2>
          </div>

          <div className="buyer-transaction-table-wrapper">
            <table className="buyer-transaction-table">
              <thead>
                <tr>
                  <th>Ternak</th>
                  <th>Penjual</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7">
                      Memuat data transaksi...
                    </td>
                  </tr>
                ) : transaksi.length > 0 ? (
                  transaksi.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.ternak?.nama || "-"}
                      </td>

                      <td>
                        {item.ternak?.penjual?.nama ||
                          "Penjual"}
                      </td>

                      <td>{item.jumlah}</td>

                      <td className="transaction-price">
                        {formatRupiah(
                          item.totalHarga
                        )}
                      </td>

                      <td>
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>

                      <td>
                        <span
                          className={`transaction-status ${
                            item.status ===
                            "Selesai"
                              ? "done"
                              : item.status ===
                                "Diproses"
                              ? "process"
                              : "pending"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="transaction-detail-btn"
                          onClick={() =>
                            navigate(
                              `/pembeli/pemesanan/${item.id}`
                            )
                          }
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      Belum ada transaksi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TransaksiPembeli;