import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/pembeli/ProfilPembeli.css";

function ProfilPembeli() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="buyer-profile-page">
      <nav className="buyer-profile-navbar">
        <div className="buyer-profile-logo">
          <div className="buyer-profile-logo-box">S</div>
          <h2>
            SIPERA <span>TORAJA</span>
          </h2>
        </div>

        <div className="buyer-profile-nav-links">
          <NavLink to="/pembeli" end>
            Beranda
          </NavLink>
          <NavLink to="/pembeli/transaksi">Transaksi</NavLink>
          <NavLink to="/pembeli/chat">Chat</NavLink>
          <NavLink to="/pembeli/profil">Profil</NavLink>
        </div>

        <div className="buyer-profile-user">
          <div>
            <strong>{loggedInUser?.nama || "Pembeli"}</strong>
            <span>Buyer</span>
          </div>
          <button type="button" onClick={handleLogout}>
            ↪
          </button>
        </div>
      </nav>

      <main className="buyer-profile-main">
        <section className="buyer-profile-header">
          <h1>Profil Pembeli</h1>
          <p>Kelola informasi akun pembeli SIPERA Anda.</p>
        </section>

        <section className="buyer-profile-layout">
          <div className="buyer-profile-card">
            <div className="buyer-profile-avatar">
              {(loggedInUser?.nama || "P").charAt(0).toUpperCase()}
            </div>

            <h2>{loggedInUser?.nama || "Pembeli SIPERA"}</h2>
            <p>{loggedInUser?.email || "pembeli@sipera.com"}</p>

            <span className="buyer-profile-role">Buyer</span>
          </div>

<div className="buyer-profile-form-card">
  <div className="buyer-profile-card-title">
    <i className="fas fa-user-cog"></i>
    <h2>Informasi Akun</h2>
  </div>

  {!isEditing ? (
    <div className="buyer-profile-view">
      <div className="buyer-info-item">
        <strong>Nama Lengkap</strong>
        <span>{loggedInUser?.nama || "-"}</span>
      </div>

      <div className="buyer-info-item">
        <strong>Email</strong>
        <span>{loggedInUser?.email || "-"}</span>
      </div>

      <div className="buyer-info-item">
        <strong>Nomor Telepon</strong>
        <span>{loggedInUser?.noTelepon || "-"}</span>
      </div>

      <div className="buyer-info-item">
        <strong>Alamat</strong>
        <span>{loggedInUser?.alamat || "-"}</span>
      </div>

      <button
        className="buyer-profile-save-btn"
        onClick={() => setIsEditing(true)}
      >
        Edit Profil
      </button>
    </div>
  ) : (
    <form className="buyer-profile-form">
      <div className="buyer-profile-grid">
        <div className="buyer-profile-group">
          <label>Nama Lengkap</label>
          <input
            type="text"
            defaultValue={loggedInUser?.nama || ""}
          />
        </div>

        <div className="buyer-profile-group">
          <label>Email</label>
          <input
            type="email"
            defaultValue={loggedInUser?.email || ""}
            disabled
          />
        </div>

        <div className="buyer-profile-group">
          <label>Nomor Telepon</label>
          <input type="text" />
        </div>

        <div className="buyer-profile-group">
          <label>Kebutuhan Ternak</label>
          <input type="text" />
        </div>
      </div>

      <div className="buyer-profile-group">
        <label>Alamat Lengkap</label>
        <textarea></textarea>
      </div>

      <button
        type="button"
        className="buyer-profile-save-btn"
      >
        Simpan Perubahan
      </button>

      <button
        type="button"
        className="buyer-profile-cancel-btn"
        onClick={() => setIsEditing(false)}
      >
        Batal
      </button>
    </form>
  )}
</div>
        </section>
      </main>
    </div>
  );
}

export default ProfilPembeli;