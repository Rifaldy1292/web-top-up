import React, { useState } from "react";

const PaymentMethod = ({ onPaymentSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    if (onPaymentSelect) {
      onPaymentSelect(method); // Kirimkan nilai ke induk jika diperlukan
    }
  };

  return (
    <div className="space-y-4">
      {/* Gopay */}
      <div
        className={`p-4 h-[70px] flex items-center justify-center rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ${
          selectedMethod === "Gopay"
            ? "bg-violet-600 text-white"
            : "bg-white text-black"
        }`}
        onClick={() => handleSelectMethod("Gopay")}
      >
        <div className="flex items-center justify-center mr-4">
          <img
            src="/path/to/gopay-icon.png"
            alt="Gopay"
            className="w-12 h-12"
          />
        </div>
        <h3 className="text-lg font-semibold text-center truncate">Gopay</h3>
      </div>

      {/* Bank Transfer */}
      <div
        className={`p-4 h-[70px] flex items-center justify-center rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ${
          selectedMethod === "Bank Transfer"
            ? "bg-violet-600 text-white"
            : "bg-white text-black"
        }`}
        onClick={() => handleSelectMethod("Bank Transfer")}
      >
        <div className="flex items-center justify-center mr-4">
          <img
            src="/path/to/bank-transfer-icon.png"
            alt="Bank Transfer"
            className="w-12 h-12"
          />
        </div>
        <h3 className="text-lg font-semibold text-center truncate">
          Bank Transfer
        </h3>
      </div>

      {/* Cash on Delivery */}
      <div
        className={`p-4 h-[70px] flex items-center justify-center rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ${
          selectedMethod === "Cash on Delivery"
            ? "bg-violet-600 text-white"
            : "bg-white text-black"
        }`}
        onClick={() => handleSelectMethod("Cash on Delivery")}
      >
        <div className="flex items-center justify-center mr-4">
          <img
            src="/path/to/cod-icon.png"
            alt="Cash on Delivery"
            className="w-12 h-12"
          />
        </div>
        <h3 className="text-lg font-semibold text-center truncate">
          Cash on Delivery
        </h3>
      </div>
    </div>
  );
};

export default PaymentMethod;
