import axios from "axios";


const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api", 
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response && error.response.status === 401) {
      
      console.error("No autorizado, redirigiendo...");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);




export const getUserProfile = async () => {
  const response = await apiClient.get("/user/profile");
  return response.data;
};


export const getAds = async () => {
  const response = await apiClient.get("/ads");
  return response.data;
};

export const createAd = async (adData) => {
  const response = await apiClient.post("/ads", adData);
  return response.data;
};

export const updateAd = async (adId, updateData) => {
  const response = await apiClient.put(`/ads/${adId}`, updateData);
  return response.data;
};

export const deleteAd = async (adId) => {
  const response = await apiClient.delete(`/ads/${adId}`);
  return response.data;
};


export const getMessages = async (chatId) => {
  const response = await apiClient.get(`/messages/${chatId}`);
  return response.data;
};

export const sendMessage = async (chatId, messageData) => {
  const response = await apiClient.post(`/messages/${chatId}`, messageData);
  return response.data;
};


export const login = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};

export default apiClient;
