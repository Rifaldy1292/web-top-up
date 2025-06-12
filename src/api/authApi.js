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

export const addGames = async (token, formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/add-game`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // ⬅️ kirim token di header
        "Content-Type": "multipart/form-data", // ⬅️ penting untuk upload file
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding game:", error);
    return null;
  }
};

export const deleteGame = async (token, gameId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/delete-game/${gameId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error delete game:", error);
    return null;
  }
};

export const fetchOneGame = async (gameId) => {
  try {
    const response = await axios.get(`${API_URL}/api/get-game/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error delete game:", error);
    return null;
  }
};
export const editGame = async (token, gameId, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/edit-game/${gameId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ⬅️ kirim token di header
          "Content-Type": "multipart/form-data", // ⬅️ penting untuk upload file
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding game:", error);
    return null;
  }
};

export const addBanner = async (token, formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/add-banner`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // ⬅️ kirim token di header
        "Content-Type": "multipart/form-data", // ⬅️ penting untuk upload file
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding banner:", error);
    return null;
  }
};

export const deleteBanner = async (token, gameId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/delete-banner/${gameId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error delete banner:", error);
    return null;
  }
};

export const addListDiamond = async (gameId, token, data) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/add-list-diamond/${gameId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding list diamond:", error); // perbaiki pesan error
    return null;
  }
};

export const deleteListDiamond = async (gameId, token, idDiamond) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/delete-list-diamond/${gameId}/${idDiamond}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting list diamond:", error); // perbaiki pesan error
    return null;
  }
};

export const editListDiamond = async (gameId, token, idDiamond, data) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/edit-list-diamond/${gameId}/${idDiamond}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing list diamond:", error); // perbaiki pesan error
    return null;
  }
};
