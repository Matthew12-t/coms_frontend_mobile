import { createContext, useEffect, useState } from "react";

import {
  login as loginRequest,
  register as registerRequest,
  logout as logoutRequest,
  fetchMe,
} from "../services/authService";
import { getSession, clearSession } from "../lib/auth";

export const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
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
    const session = await loginRequest(email, password);
    setUser(session?.user ?? null);
    return session;
  };

  const register = async (email, password) => registerRequest(email, password);

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
