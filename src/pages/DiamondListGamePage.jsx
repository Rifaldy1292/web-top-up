import { FormUserId } from "../components/layout/formUserId";
import { useParams, useLocation } from "react-router-dom";
import { fetchOneGame } from "../api/authApi";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import ListDiamond from "@/components/layout/ListDiamond";
import { ConfirmOrder } from "@/components/layout/ConfirmOrder";
import { Button } from "@/components/ui/button";
import PaymentMethod from "@/components/layout/paymentMethod";
import { Form } from "@/components/ui/form";
import LoadingOverlay from "@/components/layout/Loading.jsx";
// ✅ Schema untuk validasi
const schema = z.object({
  id: z.string().regex(/^\d+$/, "ID harus angka."),
  server: z.string().regex(/^\d+$/, "Server harus angka."),
  paymentMethod: z.string().nonempty("Metode pembayaran wajib dipilih."),
});

const DiamondListGame = () => {
  const { id } = useParams();
  const location = useLocation();
  const gameName = location.state?.gameName;
  const [games, setGames] = useState([]);
  const [userInput, setUserInput] = useState({ userId: "", serverId: "" });
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [digiflazzData, setDigiflazzData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const URL = import.meta.env.VITE_API_URL;
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: "",
      server: "",
    },
  });

  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchOneGame(id);
        if (data) setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    getGames();
  }, [id]);

  const handleDiamondSelect = (price) => {
    setSelectedDiamond(price);
  };

  const handleDigiflazzData = (data) => {
    setDigiflazzData(data);
  };

  const handleSubmit = async (data) => {
    setUserInput({ userId: data.id, serverId: data.server });

    setPaymentMethod(data.paymentMethod);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cek-id-server`,
        {
          params: { id: data.id, server: data.server },
        }
      );

      if (response.data?.data.username) {
        setNickname(response.data.data.username);
      } else {
        console.log(response.data);
        setNickname("Tidak ditemukan");
      }
    } catch (error) {
      console.error("Gagal mengambil nickname:", error);
      setNickname("Gagal mengambil nickname");
    } finally {
      setIsLoading(false); // Sembunyikan overlay
    }

    setShowConfirm(true);
  };

  const notifications = [
    { title: "Nickname", description: nickname },
    {
      title: "Id Server",
      description: ` ${userInput.userId}(${userInput.serverId})`,
    },
    {
      title: "Harga",
      description: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(digiflazzData?.price || 0),
    },
    { title: "Bayar dengan", description: paymentMethod },
  ];

  const transactionData = {
    sku_code: digiflazzData?.digiflaz?.buyer_sku_code,
    first_name: "Rifky",
    last_name: "Rifaldy",
    email: "ucbrowser012@gmail.com",
    phone: "085157553545",
    gross_amount: digiflazzData?.price || 0,
    idServer: `${userInput.userId}${userInput.serverId}`,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-5">
      <LoadingOverlay isLoading={isLoading} text="Memuat data..." />
      <h5 className="font-bold mt-5">{gameName}</h5>

      {games?.data?.url_game_banner && (
        <img
          className="w-full mt-5 h-[162px] md:h-[350px] rounded object-cover"
          src={`${URL}${games.data.url_game_banner}`}
          alt="Banner Game"
        />
      )}

      <FormProvider {...methods}>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="mt-10">
              <FormUserId />
            </div>

            <div className="mt-5">
              <ListDiamond
                onDiamondSelect={handleDiamondSelect}
                onDigiflazzData={handleDigiflazzData}
                gameId={id}
              />
            </div>

            <PaymentMethod />

            <div className="mt-5 flex justify-end">
              <Button type="submit">Lanjutkan</Button>
            </div>
          </form>
        </Form>
      </FormProvider>

      {showConfirm && digiflazzData && (
        <ConfirmOrder
          notifications={notifications}
          transactionData={transactionData}
          handleClosChild={setShowConfirm}
          onConfirm={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default DiamondListGame;
