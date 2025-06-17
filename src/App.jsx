import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Toaster } from "@/components/ui/toaster";
const HomePage = lazy(() => import("./pages/homePage.jsx"));
const DiamondListGame = lazy(() => import("./pages/DiamondListGamePage.jsx"));
const JasaJoki = lazy(() => import("./pages/jasa-joki/JasaJoki.jsx"));
const CekTransaksi = lazy(() => import("./pages/CekTransaksi.jsx"));
const LoginPage = lazy(() => import("./pages/auth/Login.jsx"));
const RegisterPage = lazy(() => import("./pages/auth/Register.jsx"));
const ContactAdmin = lazy(() => import("./pages/ContactAdmin.jsx"));
const Dashboard = lazy(() =>
  import("./pages/admin-panel/dashboard/Dashboard.jsx")
);
const Games = lazy(() => import("./pages/admin-panel/games/GameList.jsx"));
const AddGames = lazy(() => import("./pages/admin-panel/games/AddGame.jsx"));
const EditGames = lazy(() => import("./pages/admin-panel/games/Editgame.jsx"));
const MainLayout = lazy(() => import("./pages/MainLayout.jsx"));
const AllDiamondPage = lazy(() =>
  import("./pages/admin-panel/diamonds/DiamondList.jsx")
);
const BannerPage = lazy(() =>
  import("./pages/admin-panel/banner/BannerPage.jsx")
);
function LoadingLogo() {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src="/loading.png"
        alt="Loading..."
        className="w-20 h-20 animate-spin"
      />
    </div>
  );
}
function App({ children }) {
  return (
    <Suspense fallback={<LoadingLogo />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/diamond-list-game/:id" element={<DiamondListGame />} />
          <Route path="/jasa-joki" element={<JasaJoki />} />
          <Route path="/top-up" element={<HomePage />} />
          <Route path="/contact-admin" element={<ContactAdmin />} />
          <Route path="/cek-transaksi" element={<CekTransaksi />} />
          <Route path="/masuk" element={<LoginPage />} />
          <Route path="/daftar" element={<RegisterPage />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard/games" element={<Games />} />
          <Route
            path="/admin-dashboard/games/add-games"
            element={<AddGames />}
          />
          <Route
            path="/admin-dashboard/games/edit-games/:id"
            element={<EditGames />}
          />
          <Route
            path="/admin-dashboard/games/diamond-list-games/:id"
            element={<AllDiamondPage />}
          />
          <Route path="/admin-dashboard/banner" element={<BannerPage />} />
        </Route>
      </Routes>
      {children}
      <Toaster />
    </Suspense>
  );
}

export default App;
