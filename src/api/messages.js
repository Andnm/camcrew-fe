import axios from "axios";

const API_BASE = (
  import.meta.env.VITE_API_REALTIME_URL || "http://localhost:8080/api"
).replace(/\/$/, "");

const BASE_URL = `${API_BASE}/messages`;

export const fetchMessages = async (conversationId, userId) => {
  const res = await axios.get(`${BASE_URL}/${conversationId}?userId=${userId}`);
  return res.data;
};

export const sendMessage = async (payload) => {
  const res = await axios.post(BASE_URL, payload);
  return res.data;
};
