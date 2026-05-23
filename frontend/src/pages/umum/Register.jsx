import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../styles/umum/Register.css";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("pembeli");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noTelepon: "",
    password: "",
    alamat: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          nama: formData.nama,
          email: formData.email,
          password: formData.password,
          role: role,
          noTelepon: formData.noTelepon,
          alamat: formData.alamat,
        }
      );

      setSuccess(response.data.message || "Registrasi berhasil!");

      setFormData({
        nama: "",
        email: "",
        noTelepon: "",
        password: "",
        alamat: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Registrasi gagal:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registrasi gagal. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <header className="register-navbar">
        <div className="logo">
          <div className="logo-box">S</div>
          <h2>
            SIPERA <span>TORAJA</span>
          </h2>
        </div>

        <nav>
          <Link to="/">Beranda</Link>
          <Link to="/login">Masuk</Link>
          <Link to="/register" className="nav-register">
            Daftar
          </Link>
        </nav>
      </header>

      <div className="register-container">
        <div className="register-card">
          <div className="register-top">
            <h1>Daftar Akun</h1>
            <p>Bergabung dengan komunitas SIPERA</p>
          </div>

          <div className="role-switch">
            <button
              type="button"
              className={role === "pembeli" ? "active" : ""}
              onClick={() => setRole("pembeli")}
            >
              Pembeli
            </button>

            <button
              type="button"
              className={role === "penjual" ? "active" : ""}
              onClick={() => setRole("penjual")}
            >
              Penjual
            </button>
          </div>

          <form className="register-form" onSubmit={handleRegister}>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <div className="input-group">
              <label>Nama Lengkap</label>
              <div className="input-box">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama lengkap"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email</label>
              <div className="input-box">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Nomor Telepon</label>
              <div className="input-box">
                <i className="fas fa-phone"></i>
                <input
                  type="text"
                  name="noTelepon"
                  placeholder="08xxxxxxxxxx"
                  value={formData.noTelepon}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-box">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Minimal 6 karakter"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {role === "penjual" && (
              <div className="input-group">
                <label>Alamat Lengkap</label>
                <div className="input-box textarea-box">
                  <i className="fas fa-location-dot"></i>
                  <textarea
                    name="alamat"
                    placeholder="Masukkan alamat lengkap"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            )}

            {role === "pembeli" && (
              <div className="input-group">
                <label>Alamat Lengkap</label>
                <div className="input-box textarea-box">
                  <i className="fas fa-location-dot"></i>
                  <textarea
                    name="alamat"
                    placeholder="Masukkan alamat lengkap"
                    value={formData.alamat}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            )}

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Memproses..." : "Daftar Sekarang"}
              <i className="fas fa-user-plus"></i>
            </button>
          </form>

          <p className="login-text">
            Sudah punya akun? <Link to="/login">Masuk sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;