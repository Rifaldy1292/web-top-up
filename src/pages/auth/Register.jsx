import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import IndexLayout from "@/components/layout/IndexLayout";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { register } from "../../api/userApi.js";
export default function RegisterPage() {
  const [eror, setEror] = useState("");

  const [succes, setSucces] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    confirmPassword: "",
  });
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    setEror("");
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setEror("Password dan Konfirmasi Password tidak cocok");
      return;
    }
    try {
      const response = await register(formData);
      console.log("Response:", response.status);
      if (response.status !== 200 && response.status !== 201) {
        setEror(response.data || "Terjadi kesalahan saat mendaftar");
        return;
      }

      console.log("Pendaftaran berhasil:", response);
      setSucces("berhasil mendaftar silahkan login");
      setFormData({
        username: "",
        email: "",
        password: "",
        phone_number: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      // setEror("Gagal melakukan pendaftaran. Silakan coba lagi.");
    }
    console.log(formData);
  };
  return (
    <div className=" flex items-center justify-center mt-5  px-4">
      <div className="w-full max-w-md  rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold  text-center mb-6">
          Buat Akun Baru
        </h1>
        <form className="space-y-5" autocomplete="off" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium  mb-1">Username</label>
            <Input
              autoComplete="off"
              onChange={handleChange}
              name="username"
              value={formData.username}
              type="text"
              placeholder="Masukkan username "
              className="    border  "
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">Email</label>
            <Input
              autoComplete="off"
              onChange={handleChange}
              name="email"
              value={formData.email}
              type="email"
              placeholder="Masukkan email"
              className=""
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">No Telp</label>
            <Input
              autoComplete="off"
              onChange={handleChange}
              name="phone_number"
              value={formData.phone_number}
              type="text"
              placeholder="Masukkan no telp"
              className=""
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">Password</label>
            <Input
              onChange={handleChange}
              name="password"
              value={formData.password}
              type="password"
              placeholder="Masukkan password"
              className=""
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">
              Konfirmasi Password
            </label>
            <Input
              onChange={handleChange}
              name="confirmPassword"
              value={formData.confirmPassword}
              type="password"
              placeholder="Konfirmasi password"
              className=""
            />
          </div>
          <div>
            {eror && (
              <Label className="text-red-500 text-sm mt-2">{eror}</Label>
            )}
            {succes && (
              <Label className="text-green-500 text-sm mt-2">{succes}</Label>
            )}
          </div>
          <Button type="submit" className="w-full   transition-colors">
            Daftar
          </Button>
        </form>

        <div className="text-sm  text-center mt-4 space-y-1">
          <p>
            Sudah punya akun?{" "}
            <Link to="/masuk" className=" hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
