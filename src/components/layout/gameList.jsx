import { useState, useEffect } from "react";
import gameList from "../../assets/gameList.json"; // import JSON
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    setGames(gameList); // Set gameList langsung dari import JSON
  }, []); // hanya dijalankan sekali setelah komponen di-mount

  return (
    <>
      <div className=" mt-[16px] w-[360px] mx-auto md:w-[1440px]">
        <div>
          <h6 className=" font-bold text-white text-[16px] md:text-[20px] mt-[30px]">
            Daftar games{" "}
          </h6>
        </div>
        <div className=" md:mt-[10px] flex flex-wrap gap-[20px] justify-between cursor-pointer mt-[30px]">
          {games.length > 0 ? (
            games.map((game) => (
              <Link to={`/DiamondlistGame`} key={game.id}>
                <div key={game.id} className=" ">
                  <img
                    src={game.image}
                    alt={game.name} // gunakan 'name' bukan 'title'
                    className="w-[100px] h-[100px] rounded md:w-[200px] md:h-[200px]"
                  />
                </div>{" "}
                <div className="text-[16px] md:text-[20px] text-white w-[100px] mt-[5px] md:mt-[15px] md:w-[200px] break-words text-center font-semibold">
                  {game.name}
                </div>
              </Link>
            ))
          ) : (
            <div>Tidak ada game yang ditemukan</div>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default GameList;
