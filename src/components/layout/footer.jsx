import React from "react";

import logoFooter from "../../assets/img/apple.png";

const Footer = () => {
  return (
    <div className="w-full border-t border-gray-600 mt-10 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Baris 1: Logo dan deskripsi (full width di mobile) */}
        <div className="mb-10 md:mb-0 md:flex md:justify-between md:items-start md:space-x-10">
          {/* Logo */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <img
              src={logoFooter}
              alt="Logo Footer"
              className="w-[100px] h-auto mb-3"
            />
            <p className="text-gray-400 text-sm">
              © 2024 - Rifky Rifaldy. Semua hak dilindungi.
            </p>
          </div>

          {/* Baris 2: 2 kolom navigasi & bantuan */}
          <div className="grid grid-cols-2 gap-8 md:flex md:w-2/3">
            {/* Navigasi */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold mb-2">Tentang Kami</h3>
              <a href="#" className="hover:underline text-gray-300">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:underline text-gray-300">
                Syarat & Ketentuan
              </a>
              <a href="#" className="hover:underline text-gray-300">
                Cara Top Up
              </a>
            </div>

            {/* Bantuan */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold mb-2">Bantuan</h3>
              <a href="#" className="hover:underline text-gray-300">
                Hubungi CS
              </a>
              <a href="#" className="hover:underline text-gray-300">
                FAQ
              </a>
              <a href="#" className="hover:underline text-gray-300">
                Panduan Pemula
              </a>
            </div>
          </div>
        </div>

        {/* Mobile-only: credit */}
        <div className="text-center text-gray-500 text-sm mt-6 mb-4 md:hidden">
          Dibuat dengan ❤️ oleh Rifky Rifaldy
        </div>
      </div>
    </div>
  );
};

export default Footer;
