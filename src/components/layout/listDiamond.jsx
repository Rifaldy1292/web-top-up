import { useState } from "react";
import ListDiamondArray from "../../assets/priceList.json";

const ListDiamond = ({ onDiamondSelect }) => {
  const [selectedDiamond, setSelectedDiamond] = useState(null); // State untuk menyimpan pilihan diamond
  const diamonds = ListDiamondArray["Mobile-Legends"];

  // Fungsi untuk menangani perubahan pilihan diamond
  const handleDiamondSelect = (price) => {
    setSelectedDiamond(price); // Simpan diamond yang dipilih
    onDiamondSelect(price); // Panggil fungsi dari parent untuk mengirimkan nilai
  };

  return (
    <div className="w-[360px] mx-auto flex flex-wrap gap-[20px] justify-between cursor-pointer">
      {diamonds.map((diamond, index) => (
        <div
          className={`relative h-[70px] w-[160px] rounded p-[10px] text-white transition duration-200 
            ${
              selectedDiamond === diamond.price
                ? "bg-[#571c57]"
                : "bg-[#2c092c]"
            } 
            hover:bg-[#571c57]`} // Menambahkan styling kondisi jika diamond terpilih
          key={`${diamond.quantity}-${index}`}
        >
          <input
            type="radio"
            name="diamond" // Semua radio button dalam grup ini memiliki nama yang sama
            id={`diamond-${diamond.quantity}`} // ID unik untuk input
            value={diamond.price} // Menetapkan nilai diamond
            className="absolute inset-0 cursor-pointer opacity-0" // Menyembunyikan radio button tetapi tetap bisa diklik
            onChange={() => handleDiamondSelect(diamond.price)} // Menangani perubahan ketika diamond dipilih
            checked={selectedDiamond === diamond.price} // Menandai radio button yang dipilih
          />
          <label
            htmlFor={`diamond-${diamond.quantity}`}
            className="flex flex-col h-full justify-center items-center text-center"
          >
            {`${diamond.quantity}`} <br /> Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(diamond.price)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ListDiamond;
