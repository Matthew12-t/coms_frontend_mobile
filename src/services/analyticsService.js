import api from "../lib/api";

export const fetchPeakHours = async (params = {}) => {
  const { data } = await api.get("/analytics/peak-hours", { params });
  return data?.data ?? [];
};

export const fetchDailyAverages = async (params = {}) => {
  const { data } = await api.get("/analytics/daily-averages", { params });
  return data?.data ?? [];
};

export const fetchRecommendations = async (params = {}) => {
  const { data } = await api.get("/analytics/recommendations", { params });
  return data?.data ?? [];
};
