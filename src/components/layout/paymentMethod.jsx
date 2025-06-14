import { useState } from "react";

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
      <a className=" font-bold block mb-5">Pilih Metode Pembayaran</a>
      {[
        {
          label: "Qris",
          icon: "/path/to/gopay-icon.png",
        },
      ].map((method) => (
        <div
          key={method.label}
          className={`flex items-center h-[80px] rounded-xl px-4 shadow-md cursor-pointer transition duration-300 transform
        ${
          selectedMethod === method.label
            ? "bg-black text-white border-white shadow-md"
            : "bg-white text-black border-gray-300 hover:border-black"
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
