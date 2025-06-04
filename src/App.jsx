import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/homePage"));
const DiamondListGame = lazy(() => import("./pages/diamondListGame"));
const JasaJoki = lazy(() => import("./pages/jasa-joki/JasaJoki"));
const CekTransaksi = lazy(() => import("./pages/CekTransaksi"));
const LoginPage = lazy(() => import("./pages/auth/Login"));
const RegisterPage = lazy(() => import("./pages/auth/Register"));
const ContactAdmin = lazy(() => import("./pages/ContactAdmin"));
const Dashboard = lazy(() => import("./pages/admin-panel/dashboard/Dashboard"));
const Games = lazy(() => import("./pages/admin-panel/games/GameList"));
const AddGames = lazy(() => import("./pages/admin-panel/games/AddGame"));
const EditGames = lazy(() => import("./pages/admin-panel/games/Editgame"));
const AllDiamondPage = lazy(() =>
  import("./pages/admin-panel/diamonds/DiamondList")
);
const BannerPage = lazy(() => import("./pages/admin-panel/banner/BannerPage"));

function App() {
  return (
    <Suspense
      fallback={<div className="p-4 text-white">Memuat halaman...</div>}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diamond-list-game/:id" element={<DiamondListGame />} />
        <Route path="/jasa-joki" element={<JasaJoki />} />
        <Route path="/top-up" element={<HomePage />} />
        <Route path="/contact-admin" element={<ContactAdmin />} />
        <Route path="/cek-transaksi" element={<CekTransaksi />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard/games" element={<Games />} />
        <Route path="/admin-dashboard/games/add-games" element={<AddGames />} />
        <Route
          path="/admin-dashboard/games/edit-games/:id"
          element={<EditGames />}
        />
        <Route
          path="/admin-dashboard/games/diamond-list-games/:id"
          element={<AllDiamondPage />}
        />
        <Route path="/admin-dashboard/banner" element={<BannerPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
