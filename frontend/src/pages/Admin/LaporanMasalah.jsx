import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
import "../../styles/admin/LaporanMasalah.css";

function LaporanMasalah() {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/laporan");

      setLaporan(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil laporan");
    } finally {
      setLoading(false);
    }
  };

  const balasLaporan = async (id) => {
    const isiBalasan = prompt(
      "Masukkan balasan admin:"
    );

    if (!isiBalasan) return;

    try {
      await api.patch(`/api/laporan/${id}/balas`, {
        balasan: isiBalasan,
        status: "Selesai",
      });

      alert("Balasan berhasil dikirim");

      getData();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Gagal membalas laporan"
      );
    }
  };

  return (
    <div className="laporan-admin-page">
      <div className="laporan-container">
        <div className="laporan-header">
          <h1>Laporan Masalah</h1>
          <p>
            Kelola laporan masalah dari
            penjual dan pembeli.
          </p>
        </div>

        <div className="laporan-card">
          <table className="laporan-table">
            <thead>
              <tr>
                <th>Pelapor</th>
                <th>Kategori</th>
                <th>Deskripsi</th>
                <th>Status</th>
                <th>Balasan</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="empty-data"
                  >
                    Memuat data laporan...
                  </td>
                </tr>
              ) : laporan.length > 0 ? (
                laporan.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.User?.nama ||
                        "Tidak diketahui"}
                    </td>

                    <td>{item.kategori}</td>

                    <td>{item.deskripsi}</td>

                    <td>{item.status}</td>

                    <td>
                      {item.balasan ||
                        "Belum dibalas"}
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          balasLaporan(item.id)
                        }
                      >
                        Balas
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="empty-data"
                  >
                    Belum ada laporan masuk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Link to="/admin/dashboard">
          Kembali
        </Link>
      </div>
    </div>
  );
}

export default LaporanMasalah;