import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/umum/LandingPage";
import Login from "./pages/umum/Login";
import Register from "./pages/umum/Register";

import DashboardPenjual from "./pages/penjual/DashboardPenjual";
import RiwayatTernak from "./pages/penjual/RiwayatTernak";
import TambahTernak from "./pages/penjual/TambahTernak";

import DashboardPembeli from "./pages/pembeli/DashboardPembeli";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman umum */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        {/* Penjual */}
        <Route
          path="/penjual"
          element={
            <ProtectedRoute allowedRoles={["penjual"]}>
              <DashboardPenjual />
            </ProtectedRoute>
          }
        />

        <Route
          path="/penjual/dashboard"
          element={
            <ProtectedRoute allowedRoles={["penjual"]}>
              <DashboardPenjual />
            </ProtectedRoute>
          }
        />

        <Route
          path="/penjual/riwayat-ternak"
          element={
            <ProtectedRoute allowedRoles={["penjual"]}>
              <RiwayatTernak />
            </ProtectedRoute>
          }
        />

        <Route
          path="/penjual/tambah-ternak"
          element={
            <ProtectedRoute allowedRoles={["penjual"]}>
              <TambahTernak />
            </ProtectedRoute>
          }
        />

        {/* Pembeli */}
        <Route
          path="/pembeli"
          element={
            <ProtectedRoute allowedRoles={["pembeli"]}>
              <DashboardPembeli />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pembeli/dashboard"
          element={
            <ProtectedRoute allowedRoles={["pembeli"]}>
              <DashboardPembeli />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;