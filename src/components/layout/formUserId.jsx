import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import ListDiamond from "./listDiamond";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ConfirmOrder } from "@/components/layout/confirmOrder";
import PaymentMethod from "./paymentMethod";
import axios from "axios";

// Validasi schema dengan Zod
const formSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number."),
  server: z.string().regex(/^\d+$/, "Server must be a number."),
  selectedDiamond: z.number().min(1, "Please select a diamond."),
  selectedPayment: z.string().min(1, "Please select a payment method."),
});

export function ProfileForm() {
  const [isConfirmOrderVisible, setConfirmOrderVisible] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [nickname, setNickname] = useState("Loading...");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      server: "",
      selectedDiamond: 0, // Harus angka karena validasi di Zod adalah z.number()
      selectedPayment: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("=== Form Data Saat Submit ===", data);
    console.log("Form Errors:", form.formState.errors);

    try {
      // Ambil nickname dari API menggunakan Axios
      const response = await axios.get(
        `http://localhost:5000/api/user?id=${data.id}&server=${data.server}9`,
        {
          params: { id: data.id, server: data.server },
        }
      );

      const nickname = response.data.Nickname || "Tidak ditemukan";

      // Buat notifikasi dengan nickname dari API
      const notifications = [
        { title: "Nickname:", description: nickname }, // Menggunakan nickname dari API
        { title: "ID:", description: `${data.id} (${data.server})` },
        { title: "Harga:", description: data.selectedDiamond },
        { title: "Bayar dengan:", description: data.selectedPayment },
      ];

      console.log("Notifikasi akan ditampilkan:", notifications);

      setOrderData(notifications);
      setConfirmOrderVisible(true);
    } catch (error) {
      console.error("Error fetching nickname:", error);
    }
  };

  // Fungsi untuk mencegah input huruf
  const handleKeyDown = (event) => {
    const { key } = event;
    if (!/^[0-9]$/.test(key) && key !== "Backspace") {
      event.preventDefault();
    }
  };

  const handleDiamondSelect = (value) => {
    form.setValue("selectedDiamond", Number(value), { shouldValidate: true });
  };

  const handleConfirm = () => {
    console.log("Order confirmed!");
    setConfirmOrderVisible(false);
  };

  const handlePaymentSelect = (value) => {
    setSelectedPayment(value);
    form.setValue("selectedPayment", value, { shouldValidate: true });
  };

  return (
    <>
      {isConfirmOrderVisible && (
        <ConfirmOrder notifications={orderData} onConfirm={handleConfirm} />
      )}

      <div className="w-[360px] md:w-[1440px] mx-auto mt-[10px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex space-x-4 items-center">
              <div className="w-[63%]">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h5 className="font-bold text-white">Form ID</h5>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan ID"
                          {...field}
                          onKeyDown={handleKeyDown}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-[30%]">
                <FormField
                  control={form.control}
                  name="server"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h5 className="font-bold text-white">Server</h5>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Server"
                          {...field}
                          onKeyDown={handleKeyDown}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <ListDiamond onDiamondSelect={handleDiamondSelect} />
            <PaymentMethod onPaymentSelect={handlePaymentSelect} />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
