import axios from "axios";

const baseURL =
  (import.meta.env.VITE_API_URL || "http://localhost:3000/api").replace(/\/+$/, "");

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

function getToken() {
  return localStorage.getItem("camcrew_token");
}

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    let message = "Đã có lỗi xảy ra. Vui lòng thử lại.";
    const { response } = error;

    if (response) {
      if (typeof response.data === "string") message = response.data;
      else if (response.data && typeof response.data === "object") {
        message = response.data.message || response.data.error || message;
      }
    } else if (error.message) {
      message = error.message;
    }

    const status = response?.status;
    return Promise.reject({ status, message, raw: error });
  }
);

export default api;
