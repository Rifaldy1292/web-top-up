import IndexLayout from "@/components/layout/IndexLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchGames, deleteGame } from "../../../api/authApi.js";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Games = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [gamesData, setGamesData] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const token = useSelector((state) => state.auth.accessToken);
  const handleFetchGames = async () => {
    try {
      const response = await fetchGames();
      if (response) {
        setGamesData(response);
      } else {
        console.error("Failed to fetch games.");
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };
  useEffect(() => {
    handleFetchGames();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await deleteGame(token, selectedGame.id);
      if (response) {
        handleFetchGames();
      } else {
        console.error("gagal menghapus game ");
        return;
      }
    } catch (error) {
      console.error("Error deleting game:", error);
      return;
    }

    setOpenDialog(false);
  };

  return (
    <div className="p-6 max-w-[1440px]  mx-auto">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <Card className=" shadow-md h-full md:h-full  border ">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold ">Daftar Game</CardTitle>

            <Link to="/admin-dashboard/games/add-games">
              {" "}
              <Button className="border-none">Tambah Game </Button>
            </Link>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] ">ID</TableHead>
                  <TableHead className="">Nama Game</TableHead>
                  <TableHead className="">Icon Game</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="text-right ">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gamesData.map((game) => (
                  <TableRow key={game.id} className="">
                    <TableCell className="">{game.id}</TableCell>
                    <TableCell className="">{game.game_name}</TableCell>
                    <TableCell className="">{game.url_games_image}</TableCell>
                    <TableCell className="">
                      {game.status ? "Aktif" : "Tidak Aktif"}
                    </TableCell>
                    <TableCell className="text-right space-x-3">
                      <Button size="sm" className="">
                        {" "}
                        <Link
                          to={`/admin-dashboard/games/diamond-list-games/${game.id}`}
                        >
                          Atur Pilihan Diamond
                        </Link>
                      </Button>
                      <Button size="sm" className="">
                        {" "}
                        <Link
                          to={`/admin-dashboard/games/edit-games/${game.id}`}
                        >
                          Edit
                        </Link>
                      </Button>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className=" "
                          onClick={() => {
                            setSelectedGame(game);
                            setOpenDialog(true);
                          }}
                        >
                          Hapus
                        </Button>
                      </DialogTrigger>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <DialogContent className=" border  sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
            <DialogDescription className="text-white/70">
              Apakah kamu yakin ingin menghapus game{" "}
              <strong>{selectedGame?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <div className="w-full justify-end flex gap-3">
              <Button
                variant="outline"
                className="bg-gray-600 hover:bg-gray-700 text-white"
                onClick={() => setOpenDialog(false)}
              >
                Batal
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDelete}
              >
                Hapus
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Games;
