import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import IndexLayout from "@/components/layout/IndexLayout";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAmountGames } from "../../../api/userApi";
import { useState } from "react"; // Adjust the import path as necessary
const Dashboard = () => {
  const [totalGames, setTotalGames] = useState("0");
  const stats = [
    { title: "Total Games", value: totalGames, type: "games" },
    { title: "Top Up Hari Ini", value: "Rp 1.250.000", type: "games" },
    { title: "Atur Banner Homepage", value: "", type: "banner" },
    { title: "Atur Daftar Diamond", value: "245", type: "list-diamond" },
  ];
  useEffect(() => {
    const fetchAmountGames = async () => {
      try {
        const response = await getAmountGames();
        if (response) {
          console.log("Game added successfully:", response);
          setTotalGames(response.data.totalGames);
        } else {
          console.error("Failed to add game.");
        }
      } catch (error) {
        console.error("Error adding game:", error);
      }
    };

    fetchAmountGames();
  }, []);

  return (
    <IndexLayout>
      <div className="p-4 md:p-6 lg:p-10 md:max-w-[1440px] mx-auto ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight  text-white">
            Admin Dashboard
          </h1>
          <p className="text-white mt-1">
            Pantau statistik utama dari panel admin Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <Card
              key={index}
              className="shadow-sm hover:shadow-md  transition-shadow duration-200 border border-border bg-[#2c092c] flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-white/70">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white/70">
                    {item.value}
                  </p>
                </CardContent>
              </div>
              <div className="px-6 pb-4 mt-auto">
                <Button
                  variant="outline"
                  className="w-full text-sm bg-[#800080] text-white hover:bg-[#a020f0] hover:border-[#a020f0] transition-colors duration-200"
                >
                  {" "}
                  <Link to={`/admin-dashboard/${item.type}`}>Lihat Detail</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </IndexLayout>
  );
};

export default Dashboard;
