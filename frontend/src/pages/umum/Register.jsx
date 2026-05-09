import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/umum/Register.css";

function Register() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  return (
    <div className="register-page">
      <div className="register-card">

        {/* 🔙 BACK ICON */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h2>Daftar Akun</h2>
        <p>Buat akun baru untuk menggunakan SIPERA</p>

        <form>
          <input type="text" placeholder="Nama Lengkap" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Nomor Telepon" />
          <input type="password" placeholder="Password" />

          {role === "penjual" && (
            <textarea placeholder="Alamat Lengkap"></textarea>
          )}

          <select onChange={(e) => setRole(e.target.value)}>
            <option value="">Daftar sebagai</option>
            <option value="pembeli">Pembeli</option>
            <option value="penjual">Penjual</option>
          </select>

          <button type="submit">Buat Akun</button>
        </form>

        <p className="register-footer">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;