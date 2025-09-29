import api from "./client";

export async function getMe() {
  const res = await api.get("/users/current");
  return res.data;
}

export async function forgotPassword(payload) {
  const res = await api.post("/users/forgotPassword", payload);
  return res.data;
}

export async function verifyOTP(payload) {
  const res = await api.post("/users/verify-otp", payload);
  return res.data;
}

export async function resetPassword(payload) {
  const res = await api.post("/users/resetPassword", payload);
  return res.data;
}

