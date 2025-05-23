import LogoNavbardevice from "../../assets/img/apple.png";

import logoAvatar from "../../assets/img/hacker.png";
import ArrowDown from "../../assets/img/image.png";
import { useState } from "react";
import cutomerService from "../../assets/img/support.png";
import Star from "../../assets/img/user.png";
const ProfilLogin = "https://via.placeholder.com/30x30?text=Login";

import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
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
        <nav className="w-[360px] h-[56px] mx-auto flex items-center md:max-w-[1440px] md:w-full md:h-[94px] md:justify-between bg-[#2c092c]">
          <div className="text-[14px] md:text-[18px] w-[268px] h-[44px] flex text-white items-center justify-between space-x-4 px-[25px] md:w-[520px] md:h-[44px]">
            <Link to="/">
              {" "}
              <img
                src={LogoNavbardevice}
                alt=""
                className="w-[20px] h-[44px] md:w-[50px] md:h-[100px] object-contain"
              />
            </Link>

            <span className="cursor-pointer hidden md:block font-semibold">
              <Link
                to="/top-up"
                className={`font-semibold cursor-pointer transition-colors duration-200 hover:text-yellow-300 ${
                  currentPath === "/top-up" ? "underline text-yellow-400" : ""
                }`}
              >
                Top up
              </Link>
            </span>

            <span className="cursor-pointer font-semibold">
              <Link
                to="/jasa-joki"
                className={`font-semibold cursor-pointer transition-colors duration-200 hover:text-yellow-300 ${
                  currentPath === "/jasa-joki"
                    ? "underline text-yellow-400"
                    : ""
                }`}
              >
                Jasa joki
              </Link>
            </span>

            <span className="cursor-pointer font-semibold">
              <Link
                to="/cek-transaksi"
                className={`font-semibold cursor-pointer transition-colors duration-200 hover:text-yellow-300 ${
                  currentPath === "/cek-transaksi"
                    ? "underline text-yellow-400"
                    : ""
                }`}
              >
                Cek transaksi
              </Link>
            </span>
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
              onClick={handleArrowClick}
            />
          </div>
        </nav>
        {isDropdownVisible && ( // Pastikan ini sesuai dengan state
          <div className=" relative w-[300px] md:w-full md:max-w-[1400px]  mx-auto z-10">
            <div className="absolute right-3 mt-2 text-white shadow-sm text-[11px] md:text-[20px] w-[113px] h-[104px] md:w-[226px] md:h-[208px] bg-[#2c092c] rounded-[4px] md:rounded-[10px] flex flex-col justify-between ml-auto p-2 md:p-[15px]">
              {/* Daftar */}
              <div className="cursor-pointer flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-200">
                <img
                  src={Star}
                  alt=""
                  className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] mr-[5px]"
                />
                <span>
                  <Link to="/register">Daftar</Link>
                </span>
              </div>

              {/* Masuk */}
              <div className="cursor-pointer flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-200">
                <img
                  src={Star}
                  alt=""
                  className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] mr-[5px]"
                />
                <Link to="/login">Masuk</Link>
              </div>

              {/* Hubungi CS */}
              <div className="cursor-pointer flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-200">
                <img
                  src={cutomerService}
                  alt=""
                  className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] mr-[5px]"
                />

                <Link to="/contact-admin">kontak Cs</Link>
              </div>
              <div className="cursor-pointer flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-200">
                <img
                  src={cutomerService}
                  alt=""
                  className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] mr-[5px]"
                />
                <span>Panel Admin</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
