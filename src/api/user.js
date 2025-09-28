import api from "./client";

export async function getMe() {
  const res = await api.get("/users/current");
  return res.data;
}
