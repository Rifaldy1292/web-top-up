import { useState } from "react";
import ListDiamondArray from "../../assets/priceList.json";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchDiamondGames } from "../../api/userApi";

const ListDiamond = ({ onDiamondSelect, tittle }) => {
  const [selectedDiamond, setSelectedDiamond] = useState(null); // State untuk menyimpan pilihan diamond

  const [gameData, setGameData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getGameData = async () => {
      if (!id) return; // Pastikan id ada sebelum fetching
      const data = await fetchDiamondGames(id);
      setGameData(data);
      console.log(gameData);
    };

    getGameData();
  }, [id]);

  console.log(id);
  // Fungsi untuk menangani perubahan pilihan diamond
  const handleDiamondSelect = (price) => {
    console.log("Selected Diamond:", price);
    setSelectedDiamond(price); // Simpan diamond yang dipilih
    onDiamondSelect(price); // Panggil fungsi dari parent untuk mengirimkan nilai
  };

  return (
    <div>
      <a className="text-white font-bold block mb-5">Pilih Jumlah Diamond</a>

      <div className="w-full max-w-[360px] md:max-w-full mx-auto flex flex-wrap gap-4 justify-center md:justify-start cursor-pointer">
        {gameData.map((diamond, index) => (
          <div
            className={`relative w-[150px] h-[80px] rounded-xl p-3 text-white transition-all duration-200 border 
        ${
          selectedDiamond === diamond.price
            ? "bg-gradient-to-br from-[#6a1b9a] to-[#8e24aa] border-purple-300 shadow-lg"
            : "bg-[#1c1c1e] border-[#2c2c2e] hover:border-purple-400 hover:bg-[#2a0e2a]"
        }`}
            key={`${diamond.packet_name}-${index}`}
          >
            <input
              type="radio"
              name="diamond"
              id={`diamond-${diamond.packet_name}`}
              value={diamond.price}
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={() => handleDiamondSelect(diamond.price)}
              checked={selectedDiamond === diamond.price}
            />
            <label
              htmlFor={`diamond-${diamond.packet_name}`}
              className="flex flex-col justify-center items-center h-full text-center font-medium text-sm md:text-base leading-tight"
            >
              <span>{diamond.packet_name}</span>
              <span className="mt-1 text-sm text-gray-300">{`Rp ${new Intl.NumberFormat(
                "id-ID"
              ).format(diamond.price)}`}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDiamond;
