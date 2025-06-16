import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import ModalTambahBanner from "./ModalTambahBanner";
import ModalEditBanner from "./ModalEditBanner";
import IndexLayout from "@/components/layout/IndexLayout";
import { useEffect } from "react";
import { fetchBanner } from "../../../api/userApi";
import { deleteBanner } from "../../../api/authApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
const BannerPage = () => {
  const url = import.meta.env.VITE_API_URL;
  const token = useSelector((state) => state.auth.accessToken);
  const [banners, setBanners] = useState([]);
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleFetchBanners = async () => {
    try {
      const response = await fetchBanner();
      if (response) {
        setBanners(response);
      }
    } catch (error) {}
  };
  const handleDelete = async (e) => {
    try {
      const response = await deleteBanner(token, e);
      if (response) {
        handleFetchBanners();
      } else {
        console.error("gagal menghapus banner ");
        return;
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      return;
    }

    setOpenDialog(false);
  };

  useEffect(() => {
    handleFetchBanners();
  }, []);

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <div className="mx-auto p-6 space-y-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Daftar Banner</h1>
            <Button onClick={() => setShowTambahModal(true)}>
              <Plus className="mr-2" size={16} /> Tambah Banner
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banners.map((banner) => (
              <Card
                key={banner.id}
                className="overflow-hidden  relative h-full md:h-full"
              >
                <img
                  src={`${url}/${banner.url_banner_image}`}
                  alt={banner.title}
                  className="w-full h-40 object-cover"
                />{" "}
                <div className="p-4">
                  <h2 className="text-lg  font-semibold">
                    {banner.banner_name}
                  </h2>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedBanner(banner.id);
                        setOpenDialog(true);
                      }}
                    >
                      <Trash2 size={14} className="mr-1" /> Hapus
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Modal Tambah */}
          <ModalTambahBanner
            open={showTambahModal}
            onClose={() => setShowTambahModal(false)}
            onSubmit={(newBanner) => {
              setBanners([...banners, { ...newBanner, id: Date.now() }]);
              setShowTambahModal(false);
            }}
          />

          {/* Modal Edit */}
          <ModalEditBanner
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            banner={selectedBanner}
            onSubmit={(updated) => {
              setBanners(
                banners.map((b) => (b.id === updated.id ? updated : b))
              );
              setShowEditModal(false);
            }}
          />
        </div>
        <DialogContent className=" sm:max-w-[425px] rounded-md max-w-[350px] border ">
          <DialogHeader>
            <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
            <DialogDescription className="text-white/70">
              Apakah kamu yakin ingin menghapus game{" "}
              <strong>{selectedBanner?.title}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex ">
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
                onClick={() => handleDelete(selectedBanner)}
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

export default BannerPage;
