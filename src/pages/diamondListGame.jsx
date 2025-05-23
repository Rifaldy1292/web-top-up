import { CarouselDemo } from "../components/layout/CaresoulLayOut";
import Navbar from "../components/layout/navbar";
import GameList from "../components/layout/gameList";
import Footer from "../components/layout/Footer";
import { ProfileForm } from "../components/layout/formUserId";
import PaymentMethod from "@/components/layout/paymentMethod";
import { useParams, useLocation } from "react-router-dom";
const DiamondListGame = () => {
  const { id } = useParams();
  const location = useLocation();
  const gameName = location.state?.gameName; // Ambil parameter dari URL
  return (
    <>
      <Navbar />
      <div className="w-full md:max-w-[1440px] max-w-[350px] mx-auto px-4 mt-2">
        <h5 className="font-bold text-white">{gameName}</h5>
        <img
          className="w-full h-[162px] md:h-[350px] rounded mt-2 object-cover"
          src="https://via.placeholder.com/95x143/FFFFFF/000000?text=No+Image"
          alt="Game Banner"
        />
      </div>

      <ProfileForm />
      <Footer />
    </>
  );
};
export default DiamondListGame;
