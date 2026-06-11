import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";

function LaporanMasalah() {
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get("/api/admin/laporan");
      setLaporan(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-page">
      <main className="admin-main">
        <h1>Laporan Masalah</h1>

        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Pelapor</th>
                <th>Kategori</th>
                <th>Deskripsi</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {laporan.map((item) => (
                <tr key={item.id}>
                  <td>{item.namaPelapor}</td>
                  <td>{item.kategori}</td>
                  <td>{item.deskripsi}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/admin/dashboard">
          Kembali
        </Link>
      </main>
    </div>
  );
}

export default LaporanMasalah;