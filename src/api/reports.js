import api from "./client";

export async function listReports(opts = {}) {
  const { page = 1, limit = 10, status } = opts;

  const params = { page, limit };
  if (status) params.status = status;

  const res = await api.get("/reports", { params });
  return res.data;
}

export async function createNewReport(payload) {
  const res = await api.post("/reports", payload);
  return res.data;
}

export async function updateReport(report_id, payload) {
  const res = await api.put(`/reports/${report_id}`, payload);
  return res.data;
}
