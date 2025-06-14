import IndexLayout from "@/components/layout/IndexLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOneGame } from "../../../api/authApi.js";
import { useEffect } from "react";
import { editGame } from "../../../api/authApi.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const EditGames = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.accessToken);
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    status: "Active",
    logo: null,
    banner: null,
  });
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetchOneGame(token, id);
        setFormData(response.data);
      } catch (error) {
        console.error("Gagal mengambil data game:", error);
      }
    };

    fetchGame();
  }, [id, token]);

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
      const response = await editGame(token, id, formData);
      if (response) {
        navigate("/admin-dashboard/games");
      } else {
        console.error("Failed to add game.");
      }
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <>
      <div className="p-6">
        <Card className=" border  max-w-xl mx-auto min-h-fit shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl ">Edit Game</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="">
                  Nama Game
                </Label>
                <Input
                  id="name"
                  placeholder="Contoh: Mobile Legends"
                  value={formData.game_name}
                  onChange={(e) => handleChange("game_name", e.target.value)}
                  className="   placeholder:text-white/50"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    handleChange("status", Number(value))
                  }
                >
                  <SelectTrigger className=" ">
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent className=" ">
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">Non Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="logo" className="">
                  Logo Game
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange("logo", e.target.files[0])}
                  className=" file:border-0"
                />
              </div>

              <div>
                <Label htmlFor="banner" className="">
                  Banner Game
                </Label>
                <Input
                  id="banner"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange("banner", e.target.files[0])
                  }
                  className="] file:border-0"
                />
              </div>

              <Button type="submit" className=" w-full">
                Simpan Game
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EditGames;
