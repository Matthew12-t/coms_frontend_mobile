import api from "../lib/api";
import { setSession, clearSession } from "../lib/auth";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  const session = data?.data?.session;
  if (session) await setSession(session);
  return data?.data;
};

export const register = async (email, password) => {
  const { data } = await api.post("/auth/register", { email, password });
  return data?.data;
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    await clearSession();
  }
};

export const fetchMe = async () => {
  const { data } = await api.get("/auth/me");
  return data?.data;
};
