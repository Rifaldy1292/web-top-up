import LogoNavbardevice from "../../assets/img/apple.png";

import logoAvatar from "../../assets/img/hacker.png";
import ArrowDown from "../../assets/img/image.png";
import { useState } from "react";
import cutomerService from "../../assets/img/support.png";
import Star from "../../assets/img/user.png";
const ProfilLogin = "https://via.placeholder.com/30x30?text=Login";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false); // State untuk mengontrol visibilitas div

  const handleArrowClick = () => {
    setIsRotated(!isRotated); // Toggle rotasi
    setDropdownVisible(!isDropdownVisible); // Toggle visibilitas dropdown
    // console.log(document.documentElement.scrollHeight); // Tinggi total dari konten
    // console.log(document.documentElement.clientHeight); // Tinggi dari viewport yang terlihat
  };

  return (
    <>
      <div className="bg-[#2c092c]">
        <nav className="w-[360px] h-[56px] mx-auto flex items-center md:w-[1440px] md:h-[94px] md:justify-between bg-[#2c092c]">
          <div className="text-[14px]  md:text-[18px] w-[268px] h-[44px] flex text-white items-center justify-between space-x-4 px-[25px] md:w-[520px] md:h-[44px]">
            <img
              src={LogoNavbardevice}
              alt=""
              className="w-[20px] h-[44px] md:w-[50px] md:h-[100px] object-contain"
            />

            <span className="cursor-pointer hidden md:block font-semibold ">
              Top up
            </span>
            <span className="cursor-pointer font-semibold">Jasa joki</span>
            <span className="cursor-pointer font-semibold">Cek transaksi</span>
          </div>
          <div className="w-[40px] h-[20px] mx-auto flex items-center justify-center md:mx-0 md:mr-[30px]">
            <img
              src={logoAvatar}
              alt=""
              className="w-[20px] h-[20px] md:w-[76px] md:h-[40px] mr-[5px]"
            />
            <img
              src={ArrowDown}
              alt="Arrow Down"
              className={`w-[16px] h-[16px] md:w-[32px] md:h-[32px]  cursor-pointer transition-transform duration-300 ${
                isRotated ? "rotate-180" : ""
              }`}
              onClick={handleArrowClick} // Tambahkan onClick untuk mengatur visibilitas
            />
          </div>
        </nav>
        {isDropdownVisible && ( // Pastikan ini sesuai dengan state
          <div className=" relative w-[300px] md:w-[1400px] mx-auto z-10">
            <div className="absolute right-0 mt-2px text-white shadow-sm text-[11px] md:text-[20px] w-[113px] h-[104px] md:w-[226px] md:h-[208px] bg-[#2c092c] rounded-[4px] md:rounded-[10px] flex flex-col justify-between ml-auto mt-2 p-2 md:p-[15px] ">
              <div className="cursor-pointer flex items-center space-x-1">
                <img
                  src={Star}
                  alt=""
                  className="w-[16px] h-[16px] md:w-[32px] md:h-[32px]  mr-[5px]"
                />
                <span>
                  <Link to="/profil"> Daftar</Link>
                </span>
              </div>
              <div className="cursor-pointer flex items-center space-x-1">
                <img
                  src={Star}
                  alt=""
                  className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] mr-[5px]"
                />
                <span className="">Masuk</span>
              </div>
              <div className="cursor-pointer flex items-center space-x-1">
                <img
                  src={cutomerService}
                  alt=""
                  className="w-[16px] h-[16px] md:w-[32px] md:h-[32px]  mr-[5px]"
                />
                <span>Hubungi Cs</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
