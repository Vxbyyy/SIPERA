import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/umum/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("Login berhasil:", response.data);

      const { token, user } = response.data;

      if (!token || !user) {
        setError("Response login tidak valid. Token atau data user tidak ditemukan.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "penjual") {
        navigate("/penjual/dashboard");
      } else if (user.role === "pembeli") {
        navigate("/pembeli/dashboard");
      } else {
        setError("Role pengguna tidak dikenali.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login gagal. Periksa email dan password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* HEADER */}
      <header className="login-navbar">
        <div className="logo">
          <div className="logo-box">S</div>
          <h2>
            SIPERA <span>TORAJA</span>
          </h2>
        </div>

        <nav>
          <Link to="/">Beranda</Link>
          <Link to="/login" className="nav-login">
            Masuk
          </Link>
          <Link to="/register" className="nav-register">
            Daftar
          </Link>
        </nav>
      </header>

      {/* LOGIN CARD */}
      <div className="login-container">
        <div className="login-card">
          {/* TOP */}
          <div className="login-top">
            <h1>Selamat Datang</h1>
            <p>Masuk ke akun SIPERA Anda</p>
          </div>

          {/* FORM */}
          <form className="login-form" onSubmit={handleLogin}>
            {error && <p className="error-message">{error}</p>}

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
              <label>Password</label>
              <div className="input-box">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Memproses..." : "Masuk Sekarang"}
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <p className="register-text">
            Belum punya akun? <Link to="/register">Daftar sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;