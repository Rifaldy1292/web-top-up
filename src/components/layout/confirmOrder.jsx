import { useState } from "react";
import axios from "axios";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ConfirmOrder({
  notifications = [],
  className,
  onConfirm,
  ...props
}) {
  const [loading, setLoading] = useState(false); // Tambahkan loading state
  console.log(`proops ${notifications}`);
  const handleConfirm = async () => {
    try {
      setLoading(true); // Aktifkan loading

      const url = "http://localhost:5000/api/create-transaction"; // API backend kamu

      const headers = {
        "Content-Type": "application/json",
      };
      const generateTransactionId = () => {
        const now = new Date();
        const date = now.getDate().toString().padStart(2, "0"); // Tanggal 2 digit
        const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Bulan 2 digit
        const year = now.getFullYear(); // Tahun 4 digit
        const hours = now.getHours().toString().padStart(2, "0"); // Jam 2 digit
        const minutes = now.getMinutes().toString().padStart(2, "0"); // Menit 2 digit
        const randomNum = Math.floor(100 + Math.random() * 900); // 3 digit angka acak

        return `INV-${date}${month}${year}-${hours}${minutes}${randomNum}`;
      };
      const hargaItem = notifications.find((item) => item.title === "Harga:");
      const gross_amount = hargaItem ? Number(hargaItem.description) : 0;

      // Buat ID transaksi
      const transactionId = generateTransactionId();
      const body = {
        order_id: transactionId,
        gross_amount: gross_amount,
        first_name: "Rifky",
        last_name: "Pratama",
        email: "rifky@example.com",
        phone: "081234567890",
      };

      const response = await axios.post(url, body, { headers });

      console.log("Response Data:", response.data);

      // Cek apakah response mengandung token
      if (response.data?.token) {
        const transactionToken = response.data.token;
        onConfirm(); // Menampilkan pop-up Midtrans Snap
        window.snap.pay(transactionToken, {
          onSuccess: function (result) {
            console.log("Pembayaran berhasil:", result);
            alert("Pembayaran berhasil!");
          },
          onPending: function (result) {
            console.log("Menunggu pembayaran:", result);
            alert("Menunggu pembayaran!");
          },
          onError: function (result) {
            console.error("Pembayaran gagal:", result);
            alert("Pembayaran gagal!");
          },
          onClose: function () {
            console.log("User menutup pop-up tanpa menyelesaikan pembayaran.");
            alert("Anda menutup pop-up pembayaran.");
          },
        });
      } else {
        alert("Gagal mendapatkan token transaksi!");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert("Terjadi kesalahan server!");
      } else if (error.request) {
        console.error("No Response from Server:", error.request);
        alert("Tidak ada respons dari server!");
      } else {
        console.error("Axios Error:", error.message);
      }
    } finally {
      setLoading(false); // Matikan loading setelah selesai
    }
  };

  return (
    <Card
      className={cn(
        "w-[350px] h-[450px] md:h-[450px] z-[2] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ",
        className
      )}
    >
      <CardHeader>
        <CardTitle>Detail pesanan</CardTitle>
        <CardDescription>
          Mohon konfirmasi data anda sudah benar.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleConfirm} disabled={loading}>
          {loading ? (
            "Processing..."
          ) : (
            <>
              <CheckIcon /> Confirm
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
