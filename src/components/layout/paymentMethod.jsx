import { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";

const PaymentMethod = ({ defaultMethod = "" }) => {
  const { control, setValue } = useFormContext();

  const paymentMethods = [
    {
      label: "Qris",
      icon: "/qr-code.png",
    },
    // {
    //   label: "Transfer Bank",
    //   icon: "/bank.png",
    // },
    // {
    //   label: "E-Wallet",
    //   icon: "/wallet.png",
    // },
  ];

  useEffect(() => {
    if (defaultMethod) {
      setValue("paymentMethod", defaultMethod); // Set default di form
    }
  }, [defaultMethod, setValue]);

  return (
    <div className="mx-auto space-y-4 mt-5 max-w-7xl">
      <p className="font-bold mb-5">Pilih Metode Pembayaran</p>

      <Controller
        control={control}
        name="paymentMethod"
        defaultValue={defaultMethod}
        render={({ field }) => (
          <>
            {paymentMethods.map((method) => {
              const selected = field.value === method.label;
              return (
                <div
                  key={method.label}
                  className={`flex items-center h-[80px] rounded-xl px-4 shadow-md cursor-pointer transition duration-300 transform ${
                    selected
                      ? "bg-black text-white border-white shadow-md"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                  onClick={() => field.onChange(method.label)}
                >
                  <div className="flex mx-auto items-center">
                    <div
                      className={`w-10 h-10 mr-4 p-1 rounded object-cover flex items-center justify-center ${
                        selected ? "bg-white" : "bg-transparent"
                      }`}
                    >
                      <img
                        src={method.icon}
                        alt={method.label}
                        className="h-full"
                      />
                    </div>
                    <h3 className="text-base font-semibold truncate">
                      {method.label}
                    </h3>
                  </div>
                </div>
              );
            })}
          </>
        )}
      />
    </div>
  );
};

export default PaymentMethod;
