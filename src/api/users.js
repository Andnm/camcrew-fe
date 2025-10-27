import api from "./client";

export async function getMe() {
  const res = await api.get("/users/current");
  return res.data;
}

export async function getProfileById(user_id) {
  const res = await api.get(`/users/${user_id}`);
  return res.data;
}

export async function listUserByAdmin(opts = {}) {
  const { page = 1, limit = 10 } = opts;

  const params = { page, limit };

  const res = await api.get("/users", { params });
  return res.data;
}

export async function listCameramanByAdmin(opts = {}) {
  const { page = 1, limit = 10 } = opts;

  const params = { page, limit };

  const res = await api.get("/users/cameramen", { params });
  return res.data;
}

export async function forgotPassword(payload) {
  const res = await api.post("/users/forgot-password", payload);
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

export async function updateUserProfile(payload) {
  const res = await api.put(`/users`, payload);
  return res.data;
}

export async function upgradeMembershipSubscription(payload) {
  const res = await api.post("/users/membership-subscription", payload);
  return res.data;
}

export async function upRoleCameraman(user_id) {
  const res = await api.post(`/users/up-role-cameraman/${user_id}`);
  return res.data;
}

export async function updateUserProfileByAdmin(user_id, payload) {
  const res = await api.put(`/users/admin/${user_id}`, payload);
  return res.data;
}
