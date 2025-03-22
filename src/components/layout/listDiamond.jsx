import { useState } from "react";
import ListDiamondArray from "../../assets/priceList.json";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchDiamondGames } from "../../api/userApi";

const ListDiamond = ({ onDiamondSelect }) => {
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
    <div className="w-[360px] md:w-full mx-auto flex flex-wrap gap-[20px] justify-between cursor-pointer">
      {gameData.map((diamond, index) => (
        <div
          className={`relative h-[70px] w-[160px] rounded p-[10px] text-white transition duration-200 
            ${
              selectedDiamond === diamond.price
                ? "bg-[#571c57]"
                : "bg-[#2c092c]"
            } 
            hover:bg-[#571c57]`} // Menambahkan styling kondisi jika diamond terpilih
          key={`${diamond.packet_name}-${index}`}
        >
          <input
            type="radio"
            name="diamond" // Semua radio button dalam grup ini memiliki nama yang sama
            id={`diamond-${diamond.packet_name}`} // ID unik untuk input
            value={diamond.price} // Menetapkan nilai diamond
            className="absolute inset-0 cursor-pointer opacity-0" // Menyembunyikan radio button tetapi tetap bisa diklik
            onChange={() => handleDiamondSelect(diamond.price)} // Menangani perubahan ketika diamond dipilih
            checked={selectedDiamond === diamond.price} // Menandai radio button yang dipilih
          />
          <label
            htmlFor={`diamond-${diamond.packet_name}`}
            className="flex flex-col h-full justify-center items-center text-center"
          >
            {`${diamond.packet_name}`} <br /> Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(diamond.price)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ListDiamond;
