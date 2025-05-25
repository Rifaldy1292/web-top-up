import React, { useEffect, useState } from "react";
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

const ModalEditBanner = ({ open, onClose, banner, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (banner) {
      setTitle(banner.title);
      setPreview(banner.image);
    }
  }, [banner]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!title || !preview) return;
    onSubmit({
      ...banner,
      title,
      image: preview,
      file: imageFile,
    });
    setImageFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Judul Banner</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Ganti Gambar</Label>
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
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan Perubahan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditBanner;
