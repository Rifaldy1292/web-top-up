import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import LogoNavbarDevice from "../../assets/img/apple.png";

import { setAccessToken, logout } from "../../auth/authSlice";
import { refreshToken, handleLogout } from "../../api/userApi";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const location = useLocation();
  const currentPath = location.pathname;

  const [isValid, setIsValid] = useState(false);

  function isTokenExpired(token) {
    if (!token) return true;
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  }

  useEffect(() => {
    async function handleRefreshToken() {
      if (!token) {
        try {
          const response = await refreshToken();
          const newToken = response.data.accessToken;
          if (newToken) {
            dispatch(setAccessToken(newToken));
            setIsValid(true);
            return;
          } else {
            setIsValid(false);
            return;
          }
        } catch {
          setIsValid(false);
          return;
        }
      }

      if (isTokenExpired(token)) {
        try {
          const response = await refreshToken();
          dispatch(setAccessToken(response.data.accessToken));
          setIsValid(true);
        } catch {
          dispatch(logout());
          setIsValid(false);
        }
      } else {
        setIsValid(true);
      }
    }

    handleRefreshToken();
  }, [token, dispatch]);

  const logoutUser = async () => {
    try {
      await handleLogout();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full bg-background shadow-md">
      <div className="w-full mx-auto max-w-[1280px] flex items-center justify-between px-4 py-2 bg-background">
        <Link to="/" className="text-lg font-semibold">
          <img
            src={LogoNavbarDevice}
            alt=""
            className="w-[40px] md:w-[45px] object-contain"
          />
        </Link>

        <div className="items-center hidden md:flex gap-6">
          {["/top-up", "/jasa-joki", "/cek-transaksi"].map((path) => (
            <Link key={path} to={path}>
              <Button
                variant="ghost"
                className={currentPath === path ? "underline" : ""}
              >
                {path.replace("/", "").replace("-", " ").toUpperCase()}
              </Button>
            </Link>
          ))}
        </div>
        {!isValid ? (
          <div className="hidden md:flex items-center gap-6">
            <Link to="/masuk">
              <Button>Masuk</Button>
            </Link>
            <Link to="/daftar">
              <Button variant="outline">Daftar</Button>
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6">
            <Link to="/admin-dashboard">
              <Button>Panel admin</Button>
            </Link>
            <Link to="/daftar">
              <Button variant="destructive" onClick={logoutUser}>
                Keluar
              </Button>
            </Link>
          </div>
        )}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col gap-4 pt-10">
              <SheetHeader>
                <SheetTitle>Menu Navigasi</SheetTitle>
              </SheetHeader>
              <SheetDescription className="sr-only">
                Menu navigasi utama aplikasi
              </SheetDescription>
              {["/top-up", "/jasa-joki", "/cek-transaksi"].map((path) => (
                <Link key={path} to={path}>
                  <SheetClose asChild>
                    <Button variant="ghost">
                      {path.replace("/", "").replace("-", " ").toUpperCase()}
                    </Button>
                  </SheetClose>
                </Link>
              ))}

              {!isValid ? (
                <>
                  <Link to="/masuk">
                    <SheetClose className=" w-full" asChild>
                      <Button className="mt-4 w-full">Masuk</Button>
                    </SheetClose>
                  </Link>
                  <Link to="/daftar">
                    <SheetClose className=" w-full" asChild>
                      <Button variant="outline" className="w-full">
                        Daftar
                      </Button>
                    </SheetClose>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/admin-dashboard">
                    <SheetClose className=" w-full" asChild>
                      <Button variant="secondary" className="w-full">
                        Panel Admin
                      </Button>
                    </SheetClose>
                  </Link>
                  <SheetClose className=" w-full" asChild>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={logoutUser}
                    >
                      Keluar
                    </Button>
                  </SheetClose>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
