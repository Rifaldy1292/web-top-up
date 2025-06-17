import { useEffect, useState } from "react";
import axios from "axios";
import { CheckIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";
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
  handleClosChild,
  transactionData = {}, // ✅ data transaksi langsung dari parent
  ...props
}) {
  const [loading, setLoading] = useState(false);
  console.log(transactionData);
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleCancel = () => {
    handleClosChild(false);
  };

  const handleConfirm = async () => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      setLoading(true);

      const url = `${API_URL}/api/create-transaction`;

      const transactionId = generateTransactionId();

      const body = {
        ...transactionData, // gunakan semua data dari parent
        order_id: transactionId,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post(url, body, { headers });

      if (response.data?.token) {
        const transactionToken = response.data.token;
        onConfirm();
        window.snap.pay(transactionToken, {
          onSuccess: (result) => {
            console.log("Pembayaran berhasil:", result);
            alert("Pembayaran berhasil!");
          },
          onPending: (result) => {
            console.log("Menunggu pembayaran:", result);
            alert("Menunggu pembayaran!");
          },
          onError: (result) => {
            console.error("Pembayaran gagal:", result);
            alert("Pembayaran gagal!");
          },
          onClose: () => {
            console.log("User menutup pop-up tanpa menyelesaikan pembayaran.");
            alert("Anda menutup pop-up pembayaran.");
          },
        });
      } else {
        alert("Gagal mendapatkan token transaksi!");
      }
    } catch (error) {
      console.error("Transaction Error:", error);
      alert("Terjadi kesalahan saat memproses transaksi.");
    } finally {
      setLoading(false);
    }
  };

  const generateTransactionId = () => {
    const now = new Date();
    const date = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `INV-${date}${month}${year}-${hours}${minutes}${randomNum}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card
        className={cn(
          "w-[350px]  h-[450px] md:h-[450px] z-[2] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ",
          className
        )}
      >
        <button
          onClick={handleCancel}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <CardHeader>
          <CardTitle>Detail pesanan</CardTitle>
          <CardDescription>
            Mohon konfirmasi data anda sudah benar.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 overflow-y-auto">
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
          <div className="flex gap-4 w-full">
            <Button
              className="w-full"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  <CheckIcon className="mr-1 w-4 h-4" /> Confirm
                </>
              )}
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              {loading ? "Processing..." : "Cancel"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
