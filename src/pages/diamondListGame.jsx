import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

import { ProfileForm } from "../components/layout/formUserId";

import { useParams, useLocation } from "react-router-dom";
import { fetchOneGame } from "../api/authApi";
import { useState, useEffect } from "react";

const DiamondListGame = () => {
  const { id } = useParams();
  const location = useLocation();
  const gameName = location.state?.gameName; // Ambil parameter dari URL

  const [games, setGames] = useState([]);
  const URL = import.meta.env.VITE_API_URL;
  console.log("URL:", URL);
  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchOneGame(id);
        console.log("Data dari API:", data);
        if (data) {
          setGames(data);
          console.log(data);
          console.log(`${URL}/${data.data.url_game_banner}`);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    getGames();
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full md:max-w-[1440px] max-w-[350px] mx-auto px-4 mt-2">
        <h5 className="font-bold text-white">{gameName}</h5>
        <img
          className="w-full h-[162px] md:h-[350px] rounded mt-2 object-cover"
          src={`${URL}/${games?.data?.url_game_banner}`}
          alt="Game Banner"
        />
      </div>

      <ProfileForm />
      <Footer />
    </>
  );
};
export default DiamondListGame;
