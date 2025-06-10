import axios from "axios";
import { getItem, setItem } from "../services/local storage/storage.services";

export const baseURL = import.meta.env.VITE_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

const onSuccess = (response) => {
  return response.data;
};

const onError = (error) => {
  if (error.response) {
    if (error.response.status >= 404 && error.response.status < 500) {
      console.log("Client Error:", error.response.status);
    }
  }
  console.error(error);
  return Promise.reject(error);
};

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use(
  async (config) => {
    const token = getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

// Response interceptor to handle 401 errors (token expired)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = getItem("refreshToken");
      if (refreshToken) {
        try {
          const res = await fetch(
            "https://delta-project.liara.run/api/auth/refresh",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: refreshToken }),
            }
          );
          if (res.ok) {
            const data = await res.json();
            setItem("accessToken", data.accessToken);
          }
        } catch (refreshError) {
          console.log(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
