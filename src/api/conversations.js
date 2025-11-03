import axios from "axios";

const API_BASE = (import.meta.env.VITE_API_REALTIME_URL || "http://localhost:8080/api").replace(/\/$/, "");

const BASE_URL = `${API_BASE}/conversations`;

export const fetchConversations = async (userId) => {
  const res = await axios.get(`${BASE_URL}?userId=${userId}`);
  return res.data;
};

export const createConversation = async (customer, cameraman) => {
  const res = await axios.post(BASE_URL, {
    customer,
    cameraman,
  });
  return res.data;
};
