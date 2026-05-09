import { Link, useNavigate } from "react-router-dom";
import "../../styles/umum/Login.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-card">

        {/* 🔙 ICON BACK */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h2>Login SIPERA</h2>
        <p>Masuk untuk melanjutkan ke akun Anda</p>

        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>

        <p className="login-footer">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;