import React from "react";

import logoFooter from "../../assets/logo-1-16807831 (1).webp";

const Footer = () => {
  return (
    <div className="md:w-full border-t border-gray-400 md:mt-[100px] mt-[50px]">
      <div className="p-6 w-[360px] h-[194px] mx-auto mt-[27px] text-white mb-[20px] md:w-[1440px] md:h-[284px]">
        <div className="flex items-center mb-4">
          <span className=" mr-2">
            <img src={logoFooter} alt="" className=" w-[84px] h-[25px]" />
          </span>{" "}
        </div>
        <div className="mb-8">
          <p className="text-gray-400">@2024 created by rifky rifaldy</p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xl">kebijakan & privasi</span>
            <span className="text-xl">➔</span>
          </div>
          <div className="flex justify-between items-center ">
            <span className="text-xl">Hubungi cs</span>
            <span className="text-xl">➔</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
