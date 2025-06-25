import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/games`);
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
    return response.error;
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, data);
    return response;
  } catch (error) {
    console.error("eror fetching users:", error);
    return error;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, data, {
      withCredentials: true, // <== ini WAJIB supaya cookie tersimpan
    });
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const refreshToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/refresh-token`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error;
  }
};

// Anggap server kirim access token baru di response.data.accessToken
export const handleLogout = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/api/logout`,
      {},
      {
        withCredentials: true, // <== wajib agar cookie (refresh token) ikut dikirim ke backend
      }
    );
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return error;
  }
};
export const getAmountGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/games-total`);
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return error;
  }
};
export const fetchBanner = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/get-banners`);
    return response.data;
  } catch (error) {
    console.error("Error delete game:", error);
    return null;
  }
};

export const cekIdServer = async (id, server) => {
  try {
    const response = await axios.get(`${API_URL}/api/cek-id-server`, {
      params: {
        id,
        server,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error delete game:", error);
    return null;
  }
};
