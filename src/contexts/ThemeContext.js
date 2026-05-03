import { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "coms.theme";

const PALETTES = {
  light: {
    background: "#F5F6FA",
    surface: "#FFFFFF",
    surfaceMuted: "#F1F5F9",
    border: "#E2E8F0",
    textPrimary: "#0F172A",
    textSecondary: "#64748B",
    textMuted: "#94A3B8",
    brand: "#0B2A5B",
    brandSoft: "#E6ECF6",
  },
  dark: {
    background: "#0F172A",
    surface: "#1E293B",
    surfaceMuted: "#334155",
    border: "#334155",
    textPrimary: "#F1F5F9",
    textSecondary: "#CBD5E1",
    textMuted: "#94A3B8",
    brand: "#93C5FD",
    brandSoft: "#1E3A8A",
  },
};

const ThemeContext = createContext({
  theme: "light",
  colors: PALETTES.light,
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value === "light" || value === "dark") setThemeState(value);
    });
  }, []);

  const setTheme = (next) => {
    setThemeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo(
    () => ({ theme, colors: PALETTES[theme], setTheme }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
