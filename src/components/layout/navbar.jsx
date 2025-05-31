import LogoNavbardevice from "../../assets/img/apple.png";
import { useSelector } from "react-redux";
import logoAvatar from "../../assets/img/hacker.png";
import ArrowDown from "../../assets/img/image.png";
import { useState } from "react";
import cutomerService from "../../assets/img/support.png";
import Star from "../../assets/img/user.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAccessToken, logout } from "../../auth/authSlice.js";
import { refreshToken, handleLogout } from "../../api/userApi.js";
const ProfilLogin = "https://via.placeholder.com/30x30?text=Login";
import { jwtDecode } from "jwt-decode";

import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const token = useSelector((state) => state.auth.accessToken);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isRotated, setIsRotated] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false); // State untuk mengontrol visibilitas div
  function isTokenExpired(token) {
    if (!token) return true;
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000; // exp dalam detik, Date.now() dalam ms
    } catch {
      return true; // jika gagal decode, anggap expired
    }
  }

  useEffect(() => {
    async function handleRefreshToken() {
      if (!token) {
        try {
          const response = await refreshToken();
          const newToken = response.data.accessToken;

          if (newToken) {
            dispatch(setAccessToken(newToken));
            setIsValid(true);
            return; // langsung selesai kalau dapat token baru
          } else {
            setIsValid(false);
            return;
          }
        } catch (error) {
          setIsValid(false);
          return;
        }
      }

      // Kalau token ada, cek expired
      if (isTokenExpired(token)) {
        try {
          const response = await refreshToken();
          dispatch(setAccessToken(response.data.accessToken));
          setIsValid(true);
        } catch (error) {
          dispatch(logout());
          setIsValid(false);
          // navigate("/login"); // opsional redirect
        }
      } else {
        setIsValid(true);
      }
    }

    handleRefreshToken();
  }, [token, dispatch]);

  const handleArrowClick = () => {
    setIsRotated(!isRotated); // Toggle rotasi
    setDropdownVisible(!isDropdownVisible); // Toggle visibilitas dropdown
    // console.log(document.documentElement.scrollHeight); // Tinggi total dari konten
    // console.log(document.documentElement.clientHeight); // Tinggi dari viewport yang terlihat
  };
  const logoutUser = async () => {
    console.log("Logout initiated");
    try {
      const response = await handleLogout();
      console.log("Logout response:", response);
      console.log("Logout initiated2");
      dispatch(logout()); // hapus access token di redux
      navigate("/login"); // redirect ke login atau halaman lain
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
          <div className=" relative w-[300px] md:w-full md:max-w-[1400px]   mx-auto z-10">
            <div className="absolute right-3 mt-2 text-white shadow-sm text-[11px] md:text-[20px] w-[113px] h-auto md:w-[226px] md:gap-10 gap-5 bg-[#2c092c] rounded-[4px] md:rounded-[10px] flex flex-col justify-between ml-auto p-2 md:p-[15px]">
              {!isValid && (
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
              )}

              {!isValid && (
                <div className="cursor-pointer flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-200">
                  <img
                    src={Star}
                    alt=""
                    className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] mr-[5px]"
                  />
                  <Link to="/login">Masuk</Link>
                </div>
              )}
              {/* Hubungi CS */}
              <div className="cursor-pointer flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-200">
                <img
                  src={cutomerService}
                  alt=""
                  className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] mr-[5px]"
                />

                <Link to="/contact-admin">kontak Cs</Link>
              </div>
              {isValid && (
                <div className="cursor-pointer flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-200">
                  <img
                    src={cutomerService}
                    alt=""
                    className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] mr-[5px]"
                  />
                  <Link to="/admin-dashboard">Panel Admin</Link>
                </div>
              )}
              {isValid && (
                <div className="cursor-pointer flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-200">
                  <img
                    src={Star}
                    alt=""
                    className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] mr-[5px]"
                  />
                  <button onClick={logoutUser}>Log out</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
