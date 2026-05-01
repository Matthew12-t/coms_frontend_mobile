import api from "../lib/api";

export const fetchPreferences = async () => {
  const { data } = await api.get("/preferences");
  return data?.data;
};

export const updatePreferences = async (payload) => {
  const { data } = await api.put("/preferences", payload);
  return data?.data;
};
