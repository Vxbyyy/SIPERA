import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/penjual/TambahTernak.css";

function TambahTernak() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    jenis: "",
    usia: "",
    harga: "",
    stok: "",
    lokasi: "",
    deskripsi: "",
  });

  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGambarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setGambar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataTernak = {
      ...formData,
      gambar,
    };

    console.log("Data ternak:", dataTernak);
    alert("Data ternak berhasil ditambahkan!");
    navigate("/penjual");
  };

  return (
    <div className="tambah-ternak-page">
      <div className="form-container">

        {/* HEADER FIX */}
        <div className="form-header">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left"></i>
          </button>

          <div className="form-header-text">
            <h2>Tambah Data Ternak</h2>
            <p>
              Lengkapi informasi ternak yang ingin Anda jual di SIPERA.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-layout">
            <div className="form-left">
              <div className="form-grid">
                <div className="form-group">
                  <label>Nama Ternak</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Contoh: Kerbau Toraja"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Jenis Ternak</label>
                  <select
                    name="jenis"
                    value={formData.jenis}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Jenis</option>
                    <option value="Kerbau">Kerbau</option>
                    <option value="Sapi">Sapi</option>
                    <option value="Kambing">Kambing</option>
                    <option value="Babi">Babi</option>
                    <option value="Ayam">Ayam</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Usia</label>
                  <input
                    type="text"
                    name="usia"
                    value={formData.usia}
                    onChange={handleChange}
                    placeholder="Contoh: 3 Tahun"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Harga</label>
                  <input
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={handleChange}
                    placeholder="Contoh: 100000000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stok</label>
                  <input
                    type="number"
                    name="stok"
                    value={formData.stok}
                    onChange={handleChange}
                    placeholder="Contoh: 5"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Lokasi</label>
                  <input
                    type="text"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleChange}
                    placeholder="Contoh: Toraja Utara"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Tuliskan kondisi, ciri-ciri, dan informasi tambahan ternak..."
                  required
                />
              </div>
            </div>

            <div className="form-right">
              <label>Upload Foto Ternak</label>
              <p>
                Gunakan foto yang jelas agar pembeli mudah mengenali ternak.
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleGambarChange}
                required
              />

              {preview ? (
                <div className="preview-box">
                  <img src={preview} alt="Preview ternak" />
                </div>
              ) : (
                <div className="preview-placeholder">
                  Belum ada foto
                </div>
              )}
            </div>
          </div>

          <div className="button-group">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/penjual")}
            >
              Batal
            </button>

            <button type="submit" className="submit-btn">
              Simpan Ternak
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TambahTernak;