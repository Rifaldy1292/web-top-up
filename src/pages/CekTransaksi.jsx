// src/pages/CekTransaksi.jsx
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import React, { useState } from "react";

const CekTransaksi = () => {
  const [transactionId, setTransactionId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState(null);

  // Simulasi data transaksi
  const allTransactions = [
    {
      id: "ABC123",
      status: "Diproses",
      paket: "Joki Mythical Glory",
      akun: "123456789 (Server 3210)",
      tanggal: "3 Mei 2025",
    },
    {
      id: "XYZ456",
      status: "Selesai",
      paket: "Joki Epic Rank",
      akun: "987654321 (Server 2001)",
      tanggal: "1 Mei 2025",
    },
  ];

  const handleCheck = () => {
    const filteredTransactions = allTransactions.filter(
      (transaction) => transaction.id === transactionId
    );
    if (filteredTransactions.length > 0) {
      setTransactions(filteredTransactions);
      setStatus("found");
    } else {
      setTransactions([]);
      setStatus("not-found");
    }
  };

  return (
    <>
      <Navbar />
      <div className="md:min-h-screen h-[500px] flex items-center justify-center  px-4 py-10">
        <div className="bg-[#2c092c] p-6 rounded-xl w-full max-w-4xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Cek Transaksi Joki
          </h2>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Masukkan ID Transaksi"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full border border-purple-300 px-4 py-3 rounded-lg bg-[#3b0a57] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={handleCheck}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Cek Transaksi
          </button>

          {/* Tabel Transaksi */}
          {status === "found" && transactions.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full table-auto text-white">
                <thead>
                  <tr className="bg-purple-700">
                    <th className="px-4 py-2">ID Transaksi</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Paket</th>
                    <th className="px-4 py-2">Akun</th>
                    <th className="px-4 py-2">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="bg-[#3c0d4e]">
                      <td className="px-4 py-2">{transaction.id}</td>
                      <td className="px-4 py-2">{transaction.status}</td>
                      <td className="px-4 py-2">{transaction.paket}</td>
                      <td className="px-4 py-2">{transaction.akun}</td>
                      <td className="px-4 py-2">{transaction.tanggal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pesan jika transaksi tidak ditemukan */}
          {status === "not-found" && (
            <div className="mt-6 text-center text-red-400 font-semibold">
              Transaksi tidak ditemukan.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CekTransaksi;
