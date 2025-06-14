// src/pages/CekTransaksi.jsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className=" max-w-7xl mx-auto  flex items-center justify-center px-4 py-10">
      <Card className="max-w-3xl w-full mx-auto h-full md:h-full  shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Cek Transaksi Joki
          </h2>

          <div className="mb-4">
            <Input
              placeholder="Masukkan ID Transaksi"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className=""
            />
          </div>

          <Button onClick={handleCheck} className="w-full ">
            Cek Transaksi
          </Button>

          {status === "found" && transactions.length > 0 && (
            <div className="mt-6 overflow-x-auto rounded-lg border ">
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead>ID Transaksi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Paket</TableHead>
                    <TableHead>Akun</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id} className="">
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                      <TableCell>{transaction.paket}</TableCell>
                      <TableCell>{transaction.akun}</TableCell>
                      <TableCell>{transaction.tanggal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {status === "not-found" && (
            <div className="mt-6 text-center text-red-400 font-semibold">
              Transaksi tidak ditemukan.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CekTransaksi;
