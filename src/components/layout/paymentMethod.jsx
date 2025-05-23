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
      <a className="text-white font-bold block mb-5">Pilih Metode Pembayaran</a>
      {[
        {
          label: "Gopay",
          icon: "/path/to/gopay-icon.png",
        },
        {
          label: "Bank Transfer",
          icon: "/path/to/bank-transfer-icon.png",
        },
        {
          label: "Cash on Delivery",
          icon: "/path/to/cod-icon.png",
        },
      ].map((method) => (
        <div
          key={method.label}
          className={`flex items-center h-[80px] rounded-xl px-4 shadow-md cursor-pointer transition duration-300 transform
        ${
          selectedMethod === method.label
            ? "bg-violet-600 text-white shadow-lg"
            : "bg-white text-gray-900 hover:bg-violet-100 hover:scale-[1.02] hover:shadow-lg"
        }`}
          onClick={() => handleSelectMethod(method.label)}
        >
          <img
            src={method.icon}
            alt={method.label}
            className="w-10 h-10 mr-4"
          />
          <h3 className="text-base font-semibold truncate">{method.label}</h3>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;
