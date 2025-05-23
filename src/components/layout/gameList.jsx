import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGames } from "../../api/userApi"; // Pastikan API ini benar

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchGames();
        console.log("Data dari API:", data);
        if (data) {
          setGames(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    getGames();
  }, []);

  return (
    <div className="mt-[16px] w-[360px] mx-auto md:w-auto md:max-w-[1440px] p-5">
      <h6 className="font-bold text-white text-[16px] md:text-[20px] mt-[30px]">
        Daftar Games
      </h6>

      <div className="md:mt-[10px] flex flex-wrap gap-[20px]  cursor-pointer mt-[30px]">
        {games.length > 0 ? (
          games.map((game) => (
            <Link
              to={`/diamond-list-game/${game.id}`}
              key={game.id}
              state={{ gameName: game.game_name }}
            >
              <div>
                <img
                  src={game.url_games_img}
                  alt={game.game_name}
                  className="w-[100px] h-[100px] rounded md:w-[200px] md:h-[200px]"
                />
                <div className="text-[16px] md:text-[20px] text-white w-[100px] mt-[5px] md:mt-[15px] md:w-[200px] break-words text-center font-semibold">
                  {game.game_name}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-white">Tidak ada game yang ditemukan</div>
        )}
      </div>
    </div>
  );
};

export default GameList;
