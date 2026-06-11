import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/umum/LandingPage";
import Login from "./pages/umum/Login";
import Register from "./pages/umum/Register";

import DashboardPenjual from "./pages/penjual/DashboardPenjual";
import RiwayatTernak from "./pages/penjual/RiwayatTernak";
import TambahTernak from "./pages/penjual/TambahTernak";
import EditTernak from "./pages/penjual/EditTernak";
import PesananPenjual from "./pages/penjual/PesananPenjual";
import ChatPenjual from "./pages/penjual/ChatPenjual";
import LaporMasalah from "./pages/penjual/LaporanMasalah";
import ProfilPenjual from "./pages/penjual/ProfilPenjual";

import DashboardPembeli from "./pages/pembeli/DashboardPembeli";
import TransaksiPembeli from "./pages/pembeli/TransaksiPembeli";
import ChatPembeli from "./pages/pembeli/ChatPembeli";
import ProfilPembeli from "./pages/pembeli/ProfilPembeli";
import DetailTernakPembeli from "./pages/pembeli/DetailTernakPembeli";
import DetailPemesanan from "./pages/pembeli/DetailPemesanan";

import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import LaporanMasalah from "./pages/Admin/LaporanMasalah";

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

        <Route
          path="/admin/laporan"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <LaporanMasalah />
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

        <Route
          path="/penjual/edit-ternak/:id"
          element={
            <ProtectedRoute allowedRoles={["penjual"]}>
              <EditTernak />
            </ProtectedRoute>
          }
        />

        <Route
          path="/penjual/pesanan"
          element={
            <ProtectedRoute allowedRoles={["penjual"]}>
              <PesananPenjual />
            </ProtectedRoute>
          }
        />

        <Route
          path="/penjual/chat"
          element={
            <ProtectedRoute allowedRoles={["penjual"]}>
              <ChatPenjual />
            </ProtectedRoute>
          }
            Route
            path="/penjual/laporan-masalah"
            element={<LaporanMasalah />}
          />
        /

        <Route
          path="/penjual/profil"
          element={
            <ProtectedRoute allowedRoles={["penjual"]}>
              <ProfilPenjual />
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

        <Route
          path="/pembeli/transaksi"
          element={
            <ProtectedRoute allowedRoles={["pembeli"]}>
              <TransaksiPembeli />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pembeli/chat"
          element={
            <ProtectedRoute allowedRoles={["pembeli"]}>
              <ChatPembeli />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pembeli/profil"
          element={
            <ProtectedRoute allowedRoles={["pembeli"]}>
              <ProfilPembeli />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pembeli/detail-ternak/:id"
          element={
            <ProtectedRoute allowedRoles={["pembeli"]}>
              <DetailTernakPembeli />
            </ProtectedRoute>
          }
          />
          
        <Route
          path="/pembeli/pemesanan/:id"
          element={
            <ProtectedRoute allowedRoles={["pembeli"]}>
              <DetailPemesanan />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;