import api from "../lib/api";

export const fetchCanteens = async () => {
  const { data } = await api.get("/canteens");
  return data?.data ?? [];
};

export const fetchCanteen = async (id) => {
  const { data } = await api.get(`/canteens/${id}`);
  return data?.data;
};

export const fetchCanteenHistory = async (id, limit = 100) => {
  const { data } = await api.get(`/canteens/${id}/history`, { params: { limit } });
  return data?.data ?? [];
};
