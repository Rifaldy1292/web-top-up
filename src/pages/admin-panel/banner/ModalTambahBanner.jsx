import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { addBanner } from "../../../api/authApi";

const ModalTambahBanner = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const token = useSelector((state) => state.auth.accessToken);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title || !imageFile) return;
    onSubmit({
      title,
      image: preview, // untuk tampilan, file tetap disimpan di memori lokal
      file: imageFile, // bisa kamu kirim ke server atau Firebase nanti
    });

    const response = await addBanner(token, {
      title,
      image: preview, // untuk tampilan, file tetap disimpan di memori lokal
      image: imageFile, // bisa kamu kirim ke server atau Firebase nanti
    });

    setTitle("");
    setImageFile(null);
    setPreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[350px] md:w-full rounded-sm">
        <DialogHeader>
          <DialogTitle>Tambah Banner Baru</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Judul Banner</Label>
            <Input
              placeholder="Contoh: Promo 11.11"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label>Upload Gambar</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-full h-40 object-cover rounded-md"
              />
            )}
          </div>
        </div>
        <DialogFooter className="pt-4 gap-2">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTambahBanner;
