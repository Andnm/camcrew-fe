import api from "./client";

export async function getRevenueStatistics(opts = {}) {
    const { timeRange } = opts;

    const params = { timeRange };

    const res = await api.get("/statistics/revenue", { params });
    return res.data;
} 

export async function getSummaryStatistics(payload) {
  const res = await api.get("/statistics/summary", payload);
  return res.data;
}

export async function getUserDistributionStatistics(payload) {
  const res = await api.get("/statistics/users/distribution", payload);
  return res.data;
}

export async function getServicesStatusDistributionStatistics(payload) {
  const res = await api.get("/statistics/services/status-distribution", payload);
  return res.data;
}

export async function getMembershipDistributionStatistics(payload) {
  const res = await api.get("/statistics/membership/distribution", payload);
  return res.data;
}
