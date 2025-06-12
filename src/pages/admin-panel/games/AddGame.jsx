import IndexLayout from "@/components/layout/IndexLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addGames } from "@/api/authApi.js";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddGames = () => {
  const token = useSelector((state) => state.auth.accessToken);
  console.log("Token:", token);
  const [formData, setFormData] = useState({
    game_name: "",

    status: "Active",
    logo: null,
    banner: null,
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (field, file) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addGames(token, formData);
      if (response) {
        console.log("Game added successfully:", response);
        navigate("/admin-dashboard/games");
      } else {
        console.error("Failed to add game.");
      }
    } catch (error) {
      console.error("Error adding game:", error);
    }

    console.log("Game baru:", formData);
  };

  return (
    <IndexLayout>
      <div className="p-6">
        <Card className="bg-[#2c092c] border border-[#3a0b3a] text-white max-w-xl mx-auto min-h-fit shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Tambah Game</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="game_name" className="text-white">
                  Nama Game
                </Label>
                <Input
                  id="name"
                  placeholder="Contoh: Mobile Legends"
                  value={formData.game_name}
                  onChange={(e) => handleChange("game_name", e.target.value)}
                  className="bg-[#3a0b3a] border-none text-white placeholder:text-white/50"
                />
              </div>

              <div>
                <Label htmlFor="status" className="text-white">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    handleChange("status", Number(value))
                  }
                >
                  <SelectTrigger className="bg-[#3a0b3a] text-white border-none">
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#3a0b3a] text-white border-none">
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">Non Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="logo" className="text-white">
                  Logo Game
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange("logo", e.target.files[0])}
                  className="bg-[#3a0b3a] text-white file:text-white file:bg-[#800080] file:border-0"
                />
              </div>

              <div>
                <Label htmlFor="banner" className="text-white">
                  Banner Game
                </Label>
                <Input
                  id="banner"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange("banner", e.target.files[0])
                  }
                  className="bg-[#3a0b3a] text-white file:text-white file:bg-[#800080] file:border-0"
                />
              </div>

              <Button
                type="submit"
                className="bg-[#800080] text-white hover:bg-[#9c27b0] w-full"
              >
                Simpan Game
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </IndexLayout>
  );
};

export default AddGames;
