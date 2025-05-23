import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import IndexLayout from "@/components/layout/indexLayout";

export default function LoginPage() {
  return (
    <IndexLayout>
      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className="w-full max-w-md bg-[#2c092c] rounded-2xl shadow-lg p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
            Masuk ke Akun Anda
          </h1>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <Input
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
