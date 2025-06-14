// pages/JokiRankPage.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const JasaJoki = () => {
  const [formData, setFormData] = useState({
    nama: "",
    idGame: "",
    server: "",
    game: "",
    rankAwal: "",
    rankTarget: "",
    catatan: "",
    metodePembayaran: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form joki rank dikirim:", formData);
  };

  return (
    <div className="px-4 py-10">
      <Card className="max-w-xl mx-auto shadow-xl md:h-full h-full">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Jasa Joki Rank Game
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="nama"
              placeholder="Nama Pemesan"
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="idGame"
              placeholder="ID Akun Game"
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="server"
              placeholder="Server (opsional)"
              onChange={handleChange}
            />

            <Select
              onValueChange={(value) => handleSelectChange("game", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Game" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mobile Legends">Mobile Legends</SelectItem>
                <SelectItem value="Free Fire">Free Fire</SelectItem>
                <SelectItem value="PUBG Mobile">PUBG Mobile</SelectItem>
                <SelectItem value="CODM">Call of Duty Mobile</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="text"
              name="rankAwal"
              placeholder="Rank Saat Ini (Contoh: Epic)"
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="rankTarget"
              placeholder="Target Rank (Contoh: Mythic)"
              onChange={handleChange}
              required
            />

            <Textarea
              name="catatan"
              placeholder="Catatan Tambahan (opsional)"
              rows="3"
              onChange={handleChange}
            />

            <Select
              onValueChange={(value) =>
                handleSelectChange("metodePembayaran", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Metode Pembayaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gopay">Gopay</SelectItem>
                <SelectItem value="Dana">Dana</SelectItem>
                <SelectItem value="OVO">OVO</SelectItem>
                <SelectItem value="Transfer Bank">Transfer Bank</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" className="w-full">
              Kirim Permintaan Joki
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JasaJoki;
