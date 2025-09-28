import api from "./client";

export async function login({ identifier, password }) {
  const res = await api.post("/auth/login", { identifier, password });
  return res.data;
}

export async function loginGoogle(token) {
  const res = await api.post("/auth/loginGoogle", { token });
  return res.data;
}

export async function registerUser(payload) {
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export async function verifyEmail(payload) {
  const res = await api.post("/auth/verify-email", payload);
  return res.data;
}

export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

