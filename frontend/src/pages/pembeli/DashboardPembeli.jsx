import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "../../styles/pembeli/DashboardPembeli.css";

function DashboardPembeli() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");
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
    if (!foto) return null;

    if (foto.startsWith("http")) {
      return foto;
    }

    return `http://localhost:5000/uploads/${foto}`;
  };

  const fetchTernak = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/ternak");

      setDataTernak(response.data || []);
    } catch (error) {
      console.error("Gagal mengambil data ternak:", error);
      alert(
        error.response?.data?.message ||
          "Gagal mengambil data ternak dari database."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTernak();
  }, []);

  const filteredTernak = dataTernak.filter((ternak) => {
    const nama = ternak.nama || "";
    const jenis = ternak.jenis || "";
    const lokasi = ternak.lokasi || "";

    const cocokSearch =
      nama.toLowerCase().includes(search.toLowerCase()) ||
      jenis.toLowerCase().includes(search.toLowerCase()) ||
      lokasi.toLowerCase().includes(search.toLowerCase());

    const cocokKategori = kategori === "Semua" || jenis === kategori;

    return cocokSearch && cocokKategori;
  });

  const handlePesan = async (ternakId) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin memesan ternak ini?"
    );

    if (!konfirmasi) return;

    try {
      await api.post("/api/pesanan", {
        ternakId,
        jumlah: 1,
      });

      alert("Pesanan berhasil dibuat.");
      navigate("/pembeli/transaksi");
    } catch (error) {
      console.error("Gagal membuat pesanan:", error);
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Gagal membuat pesanan."
      );
    }
  };

  const handleChat = (ternak) => {
    if (!ternak.userId) {
      alert("Data penjual tidak ditemukan.");
      return;
    }

    navigate("/pembeli/chat", {
      state: {
        receiverId: ternak.userId,
        namaPenjual: ternak.penjual?.nama || "Penjual",
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="buyer-dashboard">
      <nav className="buyer-navbar">
        <div className="buyer-logo">
          <div className="buyer-logo-box">S</div>
          <h2>
            SIPERA <span>TORAJA</span>
          </h2>
        </div>

        <div className="buyer-nav-center">
          <NavLink
            to="/pembeli"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Beranda
          </NavLink>

          <NavLink
            to="/pembeli/transaksi"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Transaksi
          </NavLink>

          <NavLink
            to="/pembeli/chat"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Chat
          </NavLink>

          <NavLink
            to="/pembeli/profil"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profil
          </NavLink>
        </div>

        <div className="buyer-user">
          <div>
            <strong>{loggedInUser?.nama || "Pembeli"}</strong>
            <span>Buyer</span>
          </div>

          <button type="button" className="buyer-logout" onClick={handleLogout}>
            ↪
          </button>
        </div>
      </nav>

      <main className="buyer-main">
        <section className="buyer-header">
          <div>
            <h1>Pasar Ternak Toraja</h1>
            <p>Temukan ternak terbaik untuk kebutuhan adat dan konsumsi Anda.</p>
          </div>

          <div className="buyer-tools">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Cari jenis kerbau/babi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-tabs">
              {["Semua", "Kerbau", "Babi", "Kambing", "Ayam", "Sapi"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    className={kategori === item ? "active" : ""}
                    onClick={() => setKategori(item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </section>

        <section className="buyer-grid">
          {loading ? (
            <div className="buyer-empty">Memuat data ternak dari database...</div>
          ) : filteredTernak.length > 0 ? (
            filteredTernak.map((ternak) => {
              const fotoUrl = getFotoTernak(ternak.foto);

              return (
                <div
                  className="buyer-card"
                  key={ternak.id}
                  onClick={() =>
                    navigate(`/pembeli/detail-ternak/${ternak.id}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {fotoUrl ? (
                    <img src={fotoUrl} alt={ternak.nama} />
                  ) : (
                    <div className="buyer-card-img-placeholder">No Image</div>
                  )}

                  <div className="buyer-card-body">
                    <span className="stock-badge">
                      Stok {ternak.stok || 0}
                    </span>

                    <h3>{ternak.nama}</h3>

                    <div className="meta">
                      <span>⌖ {ternak.lokasi || "-"}</span>
                      <span>⌑ {ternak.usia || "-"}</span>
                    </div>

                    <div className="buyer-info">
                      <p>
                        <strong>Jenis:</strong> {ternak.jenis || "-"}
                      </p>
                      <p>
                        <strong>Kondisi:</strong> {ternak.kondisi || "-"}
                      </p>
                    </div>

                    <div className="card-bottom">
                      <p className="price">{formatRupiah(ternak.harga)}</p>

                      <div className="card-actions">
                        <button
                          type="button"
                          className="detail-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePesan(ternak.id);
                          }}
                        >
                          Pesan
                        </button>

                        <button
                          type="button"
                          className="chat-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChat(ternak);
                          }}
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="buyer-empty">
              Tidak ada data ternak yang sesuai dengan pencarian.
            </div>
          )}
        </section>
      </main>

      <footer className="buyer-footer">
        <div className="footer-brand">
          <div className="buyer-logo">
            <div className="buyer-logo-box">S</div>
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
          <Link to="/pembeli">Beranda</Link>
          <Link to="/pembeli/transaksi">Transaksi</Link>
          <Link to="/pembeli/chat">Chat</Link>
          <Link to="/pembeli/profil">Profil</Link>
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

export default DashboardPembeli;