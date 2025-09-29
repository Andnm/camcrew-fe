import api from "./client";

export async function listReports(opts = {}) {
  const { page = 1, limit = 10, status, type } = opts;

  const params = { page, limit };
  if (status) params.status = status;
  if (type) params.type = type;

  const res = await api.get("/reports", { params, signal });
  return res.data;
}

export async function createNewReport(payload) {
  const res = await api.post("/reports", payload);
  return res.data;
}

