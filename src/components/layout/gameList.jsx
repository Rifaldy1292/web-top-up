import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGames } from "../../api/userApi"; // Pastikan API ini benar

const GameList = () => {
  const [games, setGames] = useState([]);
  const URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchGames();

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
    <div className=" mx-auto w-auto max-w-7xl px-5 md:p-5">
      <h6 className="font-bold  text-xl md:text-[20px] ">Daftar Games</h6>

      <div className=" flex flex-wrap  mx-auto gap-5 cursor-pointer mt-5">
        {games.length > 0 ? (
          games.map((game) => (
            <Link
              to={`/diamond-list-game/${game.id}`}
              key={game.id}
              state={{ gameName: game.game_name }}
            >
              <div>
                {game?.url_games_image && (
                  <img
                    src={`${URL}${game.url_games_image}`}
                    alt={game.game_name}
                    className="w-[100px] h-[100px] shadow rounded-xl md:w-[200px] md:h-[200px]"
                  />
                )}

                <div className="text-[16px] md:text-[20px] w-[100px] mt-[5px] md:mt-[15px] md:w-[200px] break-words text-center font-semibold">
                  {game.game_name}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="">Tidak ada game yang ditemukan</div>
        )}
      </div>
    </div>
  );
};

export default GameList;
