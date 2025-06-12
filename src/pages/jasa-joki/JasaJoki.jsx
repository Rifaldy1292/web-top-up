// pages/JokiRankPage.jsx
import React, { useState } from "react";
import Navbar from "../../components/layout/navbar";
import Footer from "@/components/layout/footer";
const JasaJoki = () => {
  const [formData, setFormData] = useState({
    nama: "",
    idGame: "",
    server: "",
    game: "",
    rankAwal: "",
    rankTarget: "",
    catatan: "",
    metodePembayaran: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form joki rank dikirim:", formData);
    // Tambahkan pengiriman ke Firestore/API di sini
  };

  return (
    <>
      <Navbar />
      <div className="  text-white px-4 py-10">
        <div className="max-w-xl mx-auto bg-[#2c092c] rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center text-white-400 mb-6">
            Jasa Joki Rank Game
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nama"
              placeholder="Nama Pemesan"
              className="w-full p-3 rounded bg-[#1c1c1e] border border-violet-500"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="idGame"
              placeholder="ID Akun Game"
              className="w-full p-3 rounded bg-[#1c1c1e] border border-violet-500"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="server"
              placeholder="Server (opsional)"
              className="w-full p-3 rounded bg-[#1c1c1e] border border-violet-500"
              onChange={handleChange}
            />

            <select
              name="game"
              className="w-full p-3 rounded bg-[#1c1c1e] border border-violet-500"
              onChange={handleChange}
              required
            >
              <option value="">Pilih Game</option>
              <option value="Mobile Legends">Mobile Legends</option>
              <option value="Free Fire">Free Fire</option>
              <option value="PUBG Mobile">PUBG Mobile</option>
              <option value="CODM">Call of Duty Mobile</option>
            </select>

            <input
              type="text"
              name="rankAwal"
              placeholder="Rank Saat Ini (Contoh: Epic)"
              className="w-full p-3 rounded bg-[#1c1c1e] border border-violet-500"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="rankTarget"
              placeholder="Target Rank (Contoh: Mythic)"
              className="w-full p-3 rounded bg-[#1c1c1e] border border-violet-500"
              onChange={handleChange}
              required
            />

            <textarea
              name="catatan"
              rows="3"
              placeholder="Catatan Tambahan (opsional)"
              className="w-full p-3 rounded bg-[#1c1c1e] border border-violet-500"
              onChange={handleChange}
            ></textarea>

            <select
              name="metodePembayaran"
              className="w-full p-3 rounded bg-[#1c1c1e] border border-violet-500"
              onChange={handleChange}
              required
            >
              <option value="">Metode Pembayaran</option>
              <option value="Gopay">Gopay</option>
              <option value="Dana">Dana</option>
              <option value="OVO">OVO</option>
              <option value="Transfer Bank">Transfer Bank</option>
            </select>

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded transition duration-300"
            >
              Kirim Permintaan Joki
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JasaJoki;
