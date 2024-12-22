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

// Validasi schema dengan Zod
const formSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number."),
  server: z.string().regex(/^\d+$/, "Server must be a number."),
  selectedDiamond: z.number().min(1, "Please select a diamond."), // Validasi diamond
  selectedPayment: z.string().min(1, "Please select a payment method."), // Validasi metode pembayaran
});

export function ProfileForm() {
  const [isConfirmOrderVisible, setConfirmOrderVisible] = useState(false);
  const [orderData, setOrderData] = useState(null); // State untuk menyimpan data order
  const [selectedPayment, setSelectedPayment] = useState(""); // State untuk metode pembayaran
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      server: "",
      selectedDiamond: 0, // Set default value to 0
      selectedPayment: "", // Default kosong untuk metode pembayaran
    },
  });

  const onSubmit = (data) => {
    // Gabungkan data form dengan metode pembayaran yang dipilih
    const notifications = [
      {
        title: "Nickname:",
        description: "nama kamu",
      },
      {
        title: "ID: ", // Using form data
        description: data.id,
      },
      {
        title: "Harga:",
        description: data.selectedDiamond,
      },
      {
        title: "Bayar dengan:",
        description: data.selectedPayment, // Menampilkan metode pembayaran
      },
    ];

    console.log("Form Data:", data);
    setOrderData(notifications); // Update order data for ConfirmOrder
    setConfirmOrderVisible(true);
  };

  // Fungsi untuk mencegah input huruf
  const handleKeyDown = (event) => {
    const { key } = event;
    if (!/^[0-9]$/.test(key) && key !== "Backspace") {
      event.preventDefault();
    }
  };

  const handleDiamondSelect = (value) => {
    form.setValue("selectedDiamond", value); // Update value diamond di form
  };

  // Fungsi untuk mengonfirmasi pesanan
  const handleConfirm = () => {
    // Logika tambahan saat pesanan dikonfirmasi, jika perlu
    console.log("Order confirmed!");
    setConfirmOrderVisible(false); // Menyembunyikan notifikasi setelah konfirmasi
  };

  // Fungsi untuk mengupdate metode pembayaran yang dipilih
  const handlePaymentSelect = (value) => {
    setSelectedPayment(value); // Update state metode pembayaran
    form.setValue("selectedPayment", value); // Update nilai form dengan metode pembayaran
  };

  return (
    <>
      {isConfirmOrderVisible && (
        <ConfirmOrder notifications={orderData} onConfirm={handleConfirm} />
      )}
      <div className="w-[360px] md:w-[1440px] mx-auto mt-[10px] ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex space-x-4 items-center">
              {/* Form ID */}
              <div className="w-[63%]">
                <FormField
                  className="flex-1"
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
                          onKeyDown={handleKeyDown} // Menambahkan event handler
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[30%]">
                {/* Form Server */}
                <FormField
                  className="flex-1"
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
                          onKeyDown={handleKeyDown} // Menambahkan event handler
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
