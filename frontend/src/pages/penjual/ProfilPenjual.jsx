import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "../../styles/penjual/ProfilPenjual.css";

function ProfilPenjual() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noTelepon: "",
    alamat: "",
    namaBank: "",
    nomorRekening: "",
    namaPemilikRekening: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/auth/profile");
      const user = response.data.user || response.data;

      setFormData({
        nama: user.nama || "",
        email: user.email || "",
        noTelepon: user.noTelepon || "",
        alamat: user.alamat || "",
        namaBank: user.namaBank || "",
        nomorRekening: user.nomorRekening || "",
        namaPemilikRekening: user.namaPemilikRekening || "",
      });
    } catch (error) {
      console.error("Gagal mengambil profil:", error);

      setFormData({
        nama: loggedInUser?.nama || "",
        email: loggedInUser?.email || "",
        noTelepon: loggedInUser?.noTelepon || "",
        alamat: loggedInUser?.alamat || "",
        namaBank: loggedInUser?.namaBank || "",
        nomorRekening: loggedInUser?.nomorRekening || "",
        namaPemilikRekening: loggedInUser?.namaPemilikRekening || "",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.nama.trim()) {
      alert("Nama lengkap wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.put("/api/auth/profile", formData);
      const updatedUser = response.data.user || response.data;

      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profil penjual berhasil diperbarui.");
    } catch (error) {
      console.error("Gagal menyimpan profil:", error);
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Gagal menyimpan profil penjual."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="seller-profile-page">
      <nav className="seller-profile-navbar">
        <div className="seller-profile-logo">
          <div className="seller-profile-logo-box">S</div>
          <h2>
            SIPERA <span>TORAJA</span>
          </h2>
        </div>

        <div className="seller-profile-nav-links">
          <NavLink to="/penjual" end>
            Beranda
          </NavLink>
          <NavLink to="/penjual/riwayat-ternak">Riwayat Ternak</NavLink>
          <NavLink to="/penjual/pesanan">Pesanan</NavLink>
          <NavLink to="/penjual/chat">Chat</NavLink>
          <NavLink to="/penjual/profil">Profil</NavLink>
        </div>

        <div className="seller-profile-user">
          <div>
            <strong>{formData.nama || loggedInUser?.nama || "Penjual"}</strong>
            <span>Seller</span>
          </div>
          <button type="button" onClick={handleLogout}>
            ↪
          </button>
        </div>
      </nav>

      <main className="seller-profile-main">
        <section className="seller-profile-header">
          <h1>Profil Penjual</h1>
          <p>Kelola informasi akun, toko, dan rekening bank penjual SIPERA Anda.</p>
        </section>

        <section className="profile-layout">
          <div className="profile-card">
            <div className="profile-avatar">
              {(formData.nama || "P").charAt(0).toUpperCase()}
            </div>

            <h2>{formData.nama || "Penjual SIPERA"}</h2>
            <p>{formData.email || "penjual@sipera.com"}</p>

            <span className="profile-role">Seller</span>
          </div>

          <div className="profile-form-card">
            <div className="profile-card-title">
              <i className="fas fa-user-cog"></i>
              <h2>Informasi Akun</h2>
            </div>

            {loading ? (
              <p>Memuat profil penjual...</p>
            ) : (
              <form className="profile-form" onSubmit={handleSave}>
                <div className="profile-grid">
                  <div className="profile-group">
                    <label>Nama Lengkap</label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Nama penjual"
                    />
                  </div>

                  <div className="profile-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      disabled
                    />
                  </div>

                  <div className="profile-group">
                    <label>Nomor Telepon</label>
                    <input
                      type="text"
                      name="noTelepon"
                      value={formData.noTelepon}
                      onChange={handleChange}
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>

                <div className="profile-group">
                  <label>Alamat Lengkap</label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    placeholder="Masukkan alamat lengkap penjual"
                  ></textarea>
                </div>

                <div className="profile-card-title rekening-title">
                  <i className="fas fa-credit-card"></i>
                  <h2>Informasi Rekening Bank</h2>
                </div>

                <div className="profile-grid">
                  <div className="profile-group">
                    <label>Nama Bank</label>
                    <input
                      type="text"
                      name="namaBank"
                      value={formData.namaBank}
                      onChange={handleChange}
                      placeholder="Contoh: BRI / BCA / Mandiri"
                    />
                  </div>

                  <div className="profile-group">
                    <label>Nomor Rekening</label>
                    <input
                      type="text"
                      name="nomorRekening"
                      value={formData.nomorRekening}
                      onChange={handleChange}
                      placeholder="Masukkan nomor rekening"
                    />
                  </div>

                  <div className="profile-group full">
                    <label>Nama Pemilik Rekening</label>
                    <input
                      type="text"
                      name="namaPemilikRekening"
                      value={formData.namaPemilikRekening}
                      onChange={handleChange}
                      placeholder="Nama sesuai rekening bank"
                    />
                  </div>
                </div>

                <button type="submit" className="profile-save-btn" disabled={saving}>
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfilPenjual;