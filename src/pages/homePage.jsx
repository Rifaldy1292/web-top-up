import { CarouselDemo } from "../components/layout/CaresoulLayOut";
import Navbar from "../components/layout/navbar";
import GameList from "../components/layout/gameList";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="md:w-[1440px]  w-[360px] mx-auto mt-[16px]">
        <CarouselDemo />
        <GameList />
      </div>{" "}
      <Footer />
    </>
  );
};
export default HomePage;
