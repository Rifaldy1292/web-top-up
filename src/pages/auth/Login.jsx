import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import IndexLayout from "@/components/layout/indexLayout";
import { useState } from "react";
import { login } from "@/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);
      console.log("Response:", response);
      if (response.status !== 200 && response.status !== 201) {
        return;
      }

      console.log("Pendaftaran berhasil:", response);
      dispatch(setAccessToken(response.data.token));
      console.log("token", response.data.token);
      navigate("/");
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      // setEror("Gagal melakukan pendaftaran. Silakan coba lagi.");
    }
    console.log(formData);
  };
  return (
    <IndexLayout>
      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className="w-full max-w-md bg-[#2c092c] rounded-2xl shadow-lg p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
            Masuk ke Akun Anda
          </h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <Input
                autoComplete="off"
                onChange={handleChange}
                name="email"
                value={formData.email}
                type="email"
                placeholder="Masukkan email"
                className="bg-white/10 text-white border border-white/20 placeholder:text-white/60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <Input
                onChange={handleChange}
                name="password"
                value={formData.password}
                type="password"
                placeholder="Masukkan password"
                className="bg-white/10 text-white border border-white/20 placeholder:text-white/60"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#ff00cc] hover:bg-[#e600b8] transition-colors"
            >
              Masuk
            </Button>
          </form>

          <div className="text-sm text-white/70 text-center mt-4 space-y-1">
            <p>
              Belum punya akun?{" "}
              <Link to="/register" className="text-pink-400 hover:underline">
                Daftar di sini
              </Link>
            </p>
            <p>
              <Link to="/lupa-password" className="hover:underline">
                Lupa Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}
