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

const AllDiamondPage = () => {
  const [diamonds, setDiamonds] = useState([
    { id: 1, jumlah: "86 Diamond", harga: "Rp15.000" },
    { id: 2, jumlah: "170 Diamond", harga: "Rp30.000" },
    { id: 3, jumlah: "250 Diamond", harga: "Rp45.000" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modalData, setModalData] = useState({
    id: null,
    jumlah: "",
    harga: "",
  });

  const handleSave = () => {
    if (!modalData.jumlah.trim() || !modalData.harga.trim()) return;

    if (isEditing) {
      setDiamonds((prev) =>
        prev.map((item) => (item.id === modalData.id ? modalData : item))
      );
    } else {
      const newId = diamonds.length
        ? Math.max(...diamonds.map((d) => d.id)) + 1
        : 1;
      setDiamonds([...diamonds, { ...modalData, id: newId }]);
    }
    setModalData({ id: null, jumlah: "", harga: "" });
    setIsEditing(false);
    setIsDialogOpen(false);
  };

  const handleEdit = (item) => {
    setModalData(item);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDiamonds((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <IndexLayout>
      <div className="p-4">
        <Card className="bg-[#2c092c] border border-[#3a0b3a] text-white max-w-4xl mx-auto shadow-lg min-h-fit">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-2xl">Daftar Diamond</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#800080] hover:bg-[#9c27b0]">
                  Tambah
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2c092c] border border-[#3a0b3a] text-white">
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
                      className="bg-[#3a0b3a] border-none text-white"
                      value={modalData.jumlah}
                      onChange={(e) =>
                        setModalData({ ...modalData, jumlah: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="harga">Harga</Label>
                    <Input
                      id="harga"
                      className="bg-[#3a0b3a] border-none text-white"
                      value={modalData.harga}
                      onChange={(e) =>
                        setModalData({ ...modalData, harga: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSave}
                      className="bg-[#800080] hover:bg-[#9c27b0] flex-1"
                    >
                      Simpan
                    </Button>
                    <DialogClose asChild>
                      <Button variant="secondary" className="flex-1">
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
                      className="border-b border-[#3a0b3a] last:border-0"
                    >
                      <TableCell data-label="Jumlah Diamond">
                        {item.jumlah}
                      </TableCell>
                      <TableCell data-label="Harga">{item.harga}</TableCell>
                      <TableCell data-label="Aksi" className="text-center">
                        <div className="flex justify-center space-x-2">
                          <Button
                            className="bg-[#800080] hover:bg-[#9c27b0] text-white"
                            onClick={() => handleEdit(item)}
                            size="sm"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(item.id)}
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
    </IndexLayout>
  );
};

export default AllDiamondPage;
