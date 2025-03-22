import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/games`);
    console.log(`${API_URL}/api/games`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const fetchDiamondGames = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/game-detail/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching game:", error);
    return null;
  }
};
