import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import IndexLayout from "@/components/layout/IndexLayout";
import { useState } from "react";
import { login } from "@/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { toast } = useToast();
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

      dispatch(setAccessToken(response.data.token));

      toast({
        title: "Login Berhasil",
        description: "Anda berhasil masuk ke akun Anda.",
      });
      navigate("/");
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      toast({
        title: "Login Gagal",
        description: error?.response?.data?.message || "Terjadi kesalahan.",
        variant: "destructive",
      });
      // setEror("Gagal melakukan pendaftaran. Silakan coba lagi.");
    }
  };
  return (
    <div className="min-h-[600px] flex items-center justify-center  px-4">
      <div className="w-full max-w-md  rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold  text-center mb-6">
          Masuk ke Akun Anda
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
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
          <Button type="submit" className="w-full transition-colors">
            Masuk
          </Button>
        </form>

        <div className="text-sm  text-center mt-4 space-y-1">
          <p>
            Belum punya akun?{" "}
            <Link to="/register" className=" hover:underline">
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
  );
}
