import IndexLayout from "../components/layout/IndexLayout";

const ContactAdmin = () => {
  return (
    <IndexLayout>
      <div className="  px-4 py-10 md:px-10 lg:px-20">
        <div className="max-w-3xl  mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Hubungi Admin
          </h1>

          {/* Kontak Cepat */}
          <div className=" p-6 rounded-lg bg-[#2c092c] shadow mb-8 text-white">
            <h2 className="text-xl font-semibold mb-4">Kontak Langsung</h2>
            <p className="mb-2">
              📱 WhatsApp:{" "}
              <a
                href="https://wa.me/6281234567890"
                className="text-blue-600 underline"
              >
                +62 812-3456-7890
              </a>
            </p>
            <p className="mb-2">
              📧 Email:{" "}
              <a
                href="mailto:support@topupgame.com"
                className="text-blue-600 underline"
              >
                support@topupgame.com
              </a>
            </p>
            <p>🕒 Jam Layanan: Setiap hari, 08.00 - 22.00 WIB</p>
          </div>

          {/* Form Kontak */}
          <div className="text-white p-6 rounded-lg bg-[#2c092c] shadow">
            <h2 className="text-xl font-semibold mb-4">Kirim Pesan</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nama Anda"
                className="w-full p-3 border bg-[#3b0a57] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full p-3 border bg-[#3b0a57] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Pesan Anda"
                className="w-full p-3 border bg-[#3b0a57] border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full  text-white py-3 rounded-lg bg-purple-700 hover:bg-purple-800 transition"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Tombol WhatsApp Mobile */}
          <div className="text-center mt-10">
            <a
              target="/blank"
              href="https://wa.me/6281234567890"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-full shadow hover:bg-green-600 transition"
            >
              Chat Admin via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
};

export default ContactAdmin;
