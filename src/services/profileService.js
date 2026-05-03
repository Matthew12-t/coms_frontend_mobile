import api from "../lib/api";

export const fetchProfile = async () => {
  const { data } = await api.get("/profile");
  return data?.data ?? {};
};

export const updateProfile = async (profile) => {
  const { data } = await api.put("/profile", profile);
  return data?.data;
};
