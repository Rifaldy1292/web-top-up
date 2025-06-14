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

  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchOneGame(id);

        if (data) {
          setGames(data);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    getGames();
  }, []);
  return (
    <>
      <div className="w-full max-w-7xl  mx-auto px-4 mt-5">
        <h5 className="font-bold mt-5">{gameName}</h5>

        {games?.data?.url_game_banner && (
          <img
            className="w-full mt-5 h-[162px] md:h-[350px] rounded mt-2 object-cover"
            src={`${URL}${games.data.url_game_banner}`}
            alt="Banner Game"
          />
        )}
      </div>

      <ProfileForm />
    </>
  );
};
export default DiamondListGame;
