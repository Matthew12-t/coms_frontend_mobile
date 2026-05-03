import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "coms.language";

const translations = {
  en: {
    common: {
      light: "Light",
      dark: "Dark",
      english: "English",
      indonesian: "Indonesian",
      retry: "Retry",
      loading: "Loading...",
    },
    analytics: {
      today: "Today",
      week: "This Week",
      month: "This Month",
      avgWaitSaved: "AVG. WAIT TIME SAVED",
      mostVisited: "MOST VISITED",
      avgPeople: "AVG. PEOPLE",
      campusPeakHours: "Campus Peak Hours",
      liveAttendance: "Live Attendance · Real-time data",
      avgDensityPerDay: "Average Count per Day",
      unitPeople: "Unit: avg people",
      peakNote: "Traffic typically surges during lunch breaks.",
      noPeakData: "Not enough data yet.",
    },
    profile: {
      appSettings: "Application Settings",
      appPreferences: "APP PREFERENCES",
      themeMode: "Theme Mode",
      language: "Language",
      logout: "Log Out",
      version: "C.O.M.S. VERSION 2.4.1 STABLE",
      noProfile: "Profile not set",
    },
  },
  id: {
    common: {
      light: "Terang",
      dark: "Gelap",
      english: "Inggris",
      indonesian: "Indonesia",
      retry: "Coba Lagi",
      loading: "Memuat...",
    },
    analytics: {
      today: "Hari Ini",
      week: "Minggu Ini",
      month: "Bulan Ini",
      avgWaitSaved: "RATA-RATA HEMAT WAKTU",
      mostVisited: "PALING DIKUNJUNGI",
      avgPeople: "RATA-RATA ORANG",
      campusPeakHours: "Jam Sibuk Kampus",
      liveAttendance: "Kehadiran Langsung · Data real-time",
      avgDensityPerDay: "Rata-Rata Pengunjung per Hari",
      unitPeople: "Unit: rata-rata orang",
      peakNote: "Lalu lintas biasanya melonjak saat jam makan siang.",
      noPeakData: "Data belum cukup.",
    },
    profile: {
      appSettings: "Pengaturan Aplikasi",
      appPreferences: "PREFERENSI APLIKASI",
      themeMode: "Mode Tampilan",
      language: "Bahasa",
      logout: "Keluar",
      version: "C.O.M.S. VERSI 2.4.1 STABIL",
      noProfile: "Profil belum diisi",
    },
  },
};

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value === "en" || value === "id") setLanguageState(value);
    });
  }, []);

  const setLanguage = (next) => {
    setLanguageState(next);
    AsyncStorage.setItem(STORAGE_KEY, next);
  };

  const t = (key) => {
    const value = key.split(".").reduce((obj, k) => obj?.[k], translations[language]);
    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
