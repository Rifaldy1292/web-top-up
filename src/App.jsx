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
      </Routes>
    </>
  );
}

export default App;
