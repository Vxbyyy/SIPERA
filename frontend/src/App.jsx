import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/umum/LandingPage";
import Login from "./pages/umum/Login";
import Register from "./pages/umum/Register";

import DashboardPenjual from "./pages/penjual/DashboardPenjual";
import RiwayatTernak from "./pages/penjual/RiwayatTernak";
import TambahTernak from "./pages/penjual/TambahTernak";

import DashboardPembeli from "./pages/pembeli/DashboardPembeli";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/penjual" element={<DashboardPenjual />} />
        <Route path="/penjual/riwayat-ternak" element={<RiwayatTernak />} />
        <Route path="/penjual/tambah-ternak" element={<TambahTernak />} />

        <Route path="/pembeli" element={<DashboardPembeli />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;