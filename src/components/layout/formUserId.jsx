import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import ListDiamond from "./listDiamond";
import LoadingOverlay from "@/components/layout/Loading";
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
import { cekIdServer } from "@/api/userApi";

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
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      server: "",
      selectedDiamond: 0,
      selectedPayment: "",
    },
  });
  const handleCloseParent = (a) => {
    setConfirmOrderVisible(a);
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await cekIdServer(data.id, data.server);

      const nickname = response.data.data.username || "Tidak ditemukan";

      const notifications = [
        { title: "Nickname:", description: nickname },
        { title: "ID:", description: `${data.id} (${data.server})` },
        { title: "Harga:", description: data.selectedDiamond },
        { title: "Bayar dengan:", description: data.selectedPayment },
      ];
      setLoading(false);
      setOrderData(notifications);
      setConfirmOrderVisible(true);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching nickname:", error);
    }
  };

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
    setConfirmOrderVisible(false);
  };

  const handlePaymentSelect = (value) => {
    setSelectedPayment(value);
    form.setValue("selectedPayment", value, { shouldValidate: true });
  };

  return (
    <>
      <LoadingOverlay isLoading={loading} />
      {isConfirmOrderVisible && (
        <ConfirmOrder
          notifications={orderData}
          onConfirm={handleConfirm}
          handleClosChild={handleCloseParent}
        />
      )}

      <div className="  px-4 w-full max-w-7xl mx-auto mt-5">
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
                        <h5 className="font-bold ">Form Id Server</h5>
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
