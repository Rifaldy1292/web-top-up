import { useState, useEffect } from "react";
import { fetchDiamondGames } from "../../api/userApi";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ListDiamond = ({ gameId, onDiamondSelect, onDigiflazzData }) => {
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    const getGameData = async () => {
      if (!gameId) return;
      try {
        const data = await fetchDiamondGames(gameId);
        setGameData(data);
      } catch (error) {
        console.error("Gagal mengambil data game:", error);
      }
    };

    getGameData();
  }, [gameId]);

  const handleSelect = (diamond) => {
    setSelectedDiamond(diamond.price);
    onDiamondSelect(diamond.price);
    onDigiflazzData(diamond); // mengirim seluruh object diamond
  };

  return (
    <div>
      <Label className="font-bold text-base mb-5 block">
        Pilih Jumlah Diamond
      </Label>

      <div className="max-w-7xl mx-auto flex flex-wrap gap-5 justify-center md:justify-start">
        {gameData.map((diamond, index) => (
          <Card
            key={`${diamond.packet_name}-${index}`}
            className={`relative w-[150px] md:h-[100px] h-[90px] p-3 cursor-pointer transition-all duration-200 border 
              ${
                selectedDiamond === diamond.price
                  ? "bg-black text-white border-white shadow-md"
                  : "bg-white text-black border-gray-300 hover:border-black"
              }`}
          >
            <input
              type="radio"
              name="diamond"
              id={`diamond-${diamond.packet_name}`}
              value={diamond.price}
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={() => handleSelect(diamond)}
              checked={selectedDiamond === diamond.price}
            />
            <Label
              htmlFor={`diamond-${diamond.packet_name}`}
              className="flex flex-col items-center justify-center h-full text-center text-sm font-medium"
            >
              <span>{diamond.packet_name}</span>
              <span className="mt-1 text-muted-foreground">{`Rp ${new Intl.NumberFormat(
                "id-ID"
              ).format(diamond.price)}`}</span>
            </Label>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListDiamond;
