import { CarouselDemo } from "../components/layout/CaresoulLayOut";
import Navbar from "../components/layout/navbar";
import GameList from "../components/layout/gameList";
import Footer from "../components/layout/Footer";
import { ProfileForm } from "../components/layout/formUserId";
import PaymentMethod from "@/components/layout/paymentMethod";
const DiamondListGame = () => {
  return (
    <>
      <Navbar />
      <div className="md:w-[1440px]  w-[360px] mx-auto mt-[10px]">
        <h5 className="font-bold text-white">Mobile Legends : Bang Bang</h5>
        <img
          className="w-[360px] md:w-[1440px] h-[162px]  md:h-[350px] rounded mt-[10px]"
          src="https://via.placeholder.com/95x143/FFFFFF/000000?text=No+Image"
          alt=""
        />
      </div>{" "}
      <ProfileForm />
      <Footer />
    </>
  );
};
export default DiamondListGame;
