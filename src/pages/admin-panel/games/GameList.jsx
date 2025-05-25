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

const gamesData = [
  { id: 1, name: "Mobile Legends", genre: "MOBA", status: "Active" },
  { id: 2, name: "PUBG Mobile", genre: "Battle Royale", status: "Active" },
  { id: 3, name: "Genshin Impact", genre: "RPG", status: "Maintenance" },
];

const Games = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleDelete = () => {
    // Logika hapus bisa kamu sesuaikan sendiri
    console.log("Menghapus game dengan ID:", selectedGame?.id);
    setOpenDialog(false);
  };

  return (
    <IndexLayout>
      <div className="p-6 max-w-[1440px] mx-auto">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <Card className="bg-[#2c092c] shadow-md h-auto border border-[#3a0b3a]">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-white">
                Daftar Game
              </CardTitle>
              <Button
                variant="outline"
                className="bg-[#800080] text-white hover:bg-[#9c27b0] border-none"
              >
                <Link to="/admin-dashboard/games/add-games">Tambah Game</Link>
              </Button>
            </CardHeader>

            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-white">ID</TableHead>
                    <TableHead className="text-white">Nama Game</TableHead>
                    <TableHead className="text-white">Genre</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-right text-white">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gamesData.map((game) => (
                    <TableRow
                      key={game.id}
                      className="hover:bg-[#3a0b3a] transition-colors"
                    >
                      <TableCell className="text-white">{game.id}</TableCell>
                      <TableCell className="text-white">{game.name}</TableCell>
                      <TableCell className="text-white">{game.genre}</TableCell>
                      <TableCell className="text-white">
                        {game.status}
                      </TableCell>
                      <TableCell className="text-right space-x-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-[#9c27b0] border-[#9c27b0] text-white hover:bg-[#3a0b3a] hover:text-white"
                        >
                          {" "}
                          <Link to="/admin-dashboard/games/diamond-list-games">
                            Atur Pilihan Diamond
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-[#9c27b0] border-[#9c27b0] text-white hover:bg-[#3a0b3a] hover:text-white"
                        >
                          {" "}
                          <Link to="/admin-dashboard/games/edit-games">
                            Edit
                          </Link>
                        </Button>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 border-red-500 hover:bg-red-600 text-white bg-[#800080]"
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

          {/* Modal Konfirmasi */}

          <DialogContent className="bg-[#2c092c] border border-[#3a0b3a] text-white">
            <DialogHeader>
              <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
              <DialogDescription className="text-white/70">
                Apakah kamu yakin ingin menghapus game{" "}
                <strong>{selectedGame?.name}</strong>?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
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
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </IndexLayout>
  );
};

export default Games;
