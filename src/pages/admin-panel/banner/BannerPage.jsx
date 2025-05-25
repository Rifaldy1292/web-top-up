import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import ModalTambahBanner from "./ModalTambahBanner";
import ModalEditBanner from "./ModalEditBanner";

const dummyBanners = [
  { id: 1, image: "/src/image/banner1.jpg", title: "Promo Spesial MLBB" },
  { id: 2, image: "/src/image/banner2.jpg", title: "Diskon PUBG 70%" },
];

const BannerPage = () => {
  const [banners, setBanners] = useState(dummyBanners);
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleHapus = (id) => {
    const filtered = banners.filter((b) => b.id !== id);
    setBanners(filtered);
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setShowEditModal(true);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Banner</h1>
        <Button onClick={() => setShowTambahModal(true)}>
          <Plus className="mr-2" size={16} /> Tambah Banner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <Card key={banner.id} className="overflow-hidden relative">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{banner.title}</h2>
              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={() => handleEdit(banner)}>
                  <Pencil size={14} className="mr-1" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleHapus(banner.id)}
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
          setBanners(banners.map((b) => (b.id === updated.id ? updated : b)));
          setShowEditModal(false);
        }}
      />
    </div>
  );
};

export default BannerPage;
