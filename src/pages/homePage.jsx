import { CarouselDemo } from "../components/layout/CaresoulLayOut";
import Navbar from "../components/layout/navbar";
import GameList from "../components/layout/gameList";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div>
        <CarouselDemo />
        <GameList />
      </div>
      <Footer />
    </>
  );
};
export default HomePage;
