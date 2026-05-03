import api from "../lib/api";
import { setSession, clearSession } from "../lib/auth";

const MOBILE_REDIRECT = "coms://auth/callback";

export const register = async (email, password) => {
  const { data } = await api.post("/auth/register", {
    email,
    password,
    redirectTo: MOBILE_REDIRECT,
  });
  const session = data?.data?.session;
  if (session) await setSession(session);
  return data?.data;
};

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  const session = data?.data?.session;
  if (session) await setSession(session);
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

export const verifyEmailToken = async (token_hash, type) => {
  const { data } = await api.post("/auth/verify-email", { token_hash, type });
  return data?.data;
};

export const exchangeCode = async (code) => {
  const { data } = await api.post("/auth/exchange-code", { code });
  return data?.data;
};
