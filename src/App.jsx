import { Button } from "./components/ui/button";
import { CarouselDemo } from "./components/layout/CaresoulLayOut";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/homePage";
import DiamondListGame from "./pages/diamondListGame";
import JasaJoki from "./pages/jasa-joki/JasaJoki";
import CekTransaksi from "./pages/CekTransaksi";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ContactAdmin from "./pages/ContactAdmin";
import Dashboard from "./pages/admin-panel/dashboard/Dashboard";
import Games from "./pages/admin-panel/games/GameList";
import AddGames from "./pages/admin-panel/games/AddGame";
import EditGames from "./pages/admin-panel/games/Editgame";
import AllDiamondPage from "./pages/admin-panel/diamonds/DiamondList";
import BannerPage from "./pages/admin-panel/banner/BannerPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diamond-list-game/:id" element={<DiamondListGame />} />
        <Route path="/jasa-joki" element={<JasaJoki />} />
        <Route path="/top-up" element={<HomePage />} />{" "}
        <Route path="/contact-admin" element={<ContactAdmin />} />
        <Route path="/cek-transaksi" element={<CekTransaksi />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard/games" element={<Games />} />
        <Route path="/admin-dashboard/games/add-games" element={<AddGames />} />
        AllDiamondPage
        <Route
          path="/admin-dashboard/games/edit-games"
          element={<EditGames />}
          x
        />
        <Route
          path="/admin-dashboard/games/diamond-list-games"
          element={<AllDiamondPage />}
        />
        <Route path="/admin-dashboard/banner" element={<BannerPage />} />
      </Routes>
    </>
  );
}

export default App;
