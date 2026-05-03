import { createContext, useCallback, useEffect, useState } from "react";

import {
  login as loginRequest,
  register as registerRequest,
  logout as logoutRequest,
  fetchMe,
  verifyEmailToken as verifyEmailTokenRequest,
  exchangeCode as exchangeCodeRequest,
} from "../services/authService";
import { getSession, setSession, clearSession } from "../lib/auth";

export const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  verifyCallback: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const bootstrap = async () => {
      const session = await getSession();
      if (!active) return;
      if (!session?.access_token) {
        setLoading(false);
        return;
      }
      try {
        const me = await fetchMe();
        if (active) setUser(me);
      } catch {
        await clearSession();
      } finally {
        if (active) setLoading(false);
      }
    };
    bootstrap();
    return () => {
      active = false;
    };
  }, []);

  const login = async (email, password) => {
    const result = await loginRequest(email, password);
    setUser(result?.user ?? null);
    return result;
  };

  const register = async (email, password) => {
    const result = await registerRequest(email, password);
    if (result?.session) setUser(result.user ?? null);
    return result;
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  const verifyCallback = useCallback(async (url) => {
    const query = url.split("?")[1] || "";
    const params = new URLSearchParams(query);
    const code = params.get("code");
    const tokenHash = params.get("token_hash");
    const type = params.get("type") || "signup";

    if (!code && !tokenHash) return;

    try {
      const result = code
        ? await exchangeCodeRequest(code)
        : await verifyEmailTokenRequest(tokenHash, type);

      if (result?.session) {
        await setSession(result.session);
        setUser(result.user ?? null);
      }
    } catch {
      // verification failed — user stays on auth screen
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, verifyCallback }}>
      {children}
    </AuthContext.Provider>
  );
};
