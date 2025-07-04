import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import IndexLayout from "@/components/layout/IndexLayout";
import { addListDiamond } from "../../../api/authApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDiamondGames } from "../../../api/userApi";
import { deleteListDiamond, editListDiamond } from "../../../api/authApi";
const AllDiamondPage = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const [diamonds, setDiamonds] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [modalData, setModalData] = useState({
    packet_name: "",
    amount: "",
    harga: "",
  });

  const { id } = useParams();
  const getGameData = async () => {
    if (!id) return; // Pastikan id ada sebelum fetching
    const data = await fetchDiamondGames(id);
    setDiamonds(data);
  };
  const handleConfirm = async () => {
    if (!isEditing) {
      try {
        const dataToSend = {
          packet_name: modalData.packet_name,
          amount: modalData.packet_name,
          price: modalData.harga,
          status: "active",
          game_id: id,
        };
        const response = await addListDiamond(id, token, dataToSend);

        setModalData({
          packet_name: "",
          amount: "",
          harga: "",
        });
        setIsDialogOpen(false);
        getGameData();
        // Misalnya: tutup modal atau refresh data
      } catch (error) {
        console.error("Gagal tambah diamond:", error);
        setIsDialogOpen(false);
        // Tambahkan penanganan error di UI jika perlu
      }
    } else {
      try {
        const dataToSend = {
          packet_name: modalData.packet_name,
          amount: modalData.packet_name,
          price: modalData.harga,
          status: "active",
          game_id: id,
        };
        const response = await editListDiamond(
          id,
          token,
          selectedDiamond.id,
          dataToSend
        );

        setIsDialogOpen(false);
        getGameData();
        // Misalnya: tutup modal atau refresh data
      } catch (error) {
        console.error("Gagal tambah diamond:", error);
        setIsDialogOpen(false);
        // Tambahkan penanganan error di UI jika perlu
      }
    }
  };
  const handleEdit = (item) => {
    setModalData(item);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id, token, idDiamond) => {
    try {
      const response = await deleteListDiamond(id, token, idDiamond);
      if (response) {
        setOpenDialog(false);
        getGameData();
      }
    } catch (error) {
      console.error("Gagal hapus diamond:", error);
    }
  };
  const handleCancleModal = () => {
    setIsEditing(false);
    setModalData({
      packet_name: "",
      amount: "",
      harga: "",
    });
  };
  useEffect(() => {
    getGameData();
  }, [id]);
  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <div className="p-4">
          <Card className="border   max-w-4xl mx-auto shadow-lg min-h-fit">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-2xl">Daftar Diamond</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className=" ">Tambah</Button>
                </DialogTrigger>
                <DialogContent className=" border ">
                  <DialogHeader>
                    <DialogTitle>
                      {isEditing ? "Edit Diamond" : "Tambah Diamond"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="jumlah">Jumlah Diamond</Label>
                      <Input
                        id="jumlah"
                        className=""
                        value={modalData.packet_name}
                        onChange={(e) =>
                          setModalData({
                            ...modalData,
                            packet_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="harga">Harga</Label>
                      <Input
                        id="harga"
                        className=""
                        value={modalData.price}
                        onChange={(e) =>
                          setModalData({ ...modalData, harga: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleConfirm} className=" flex-1">
                        Simpan
                      </Button>
                      <DialogClose asChild>
                        <Button
                          variant="secondary"
                          className="flex-1"
                          onClick={() => handleCancleModal()}
                        >
                          Batal
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {/* Membuat tabel dengan overflow-x-auto agar scroll horizontal di mobile */}
              <div className="overflow-x-auto">
                <Table className="min-w-[320px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jumlah Diamond</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {diamonds.map((item) => (
                      <TableRow
                        key={item.id}
                        className="border-b  last:border-0"
                      >
                        <TableCell data-label="Jumlah Diamond">
                          {item.packet_name} Diamonds
                        </TableCell>
                        <TableCell data-label="Harga">{item.price}</TableCell>
                        <TableCell data-label="Aksi" className="text-center">
                          <div className="flex justify-center space-x-2">
                            <Button
                              className=""
                              onClick={() => {
                                setSelectedDiamond(item);
                                handleEdit(item);
                              }}
                              size="sm"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                setSelectedDiamond(item);
                                setOpenDialog(true);
                              }}
                              size="sm"
                            >
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
            <DialogDescription className="text-white/70">
              Apakah kamu yakin ingin menghapus game{" "}
              {/* <strong>{selectedGame?.name}</strong>? */}
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
                onClick={() => {
                  handleDelete(id, token, selectedDiamond.id);
                }}
              >
                Hapus
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AllDiamondPage;
