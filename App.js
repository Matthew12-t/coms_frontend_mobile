import "react-native-gesture-handler";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider } from "./src/contexts/AuthContext";
import { PreferencesProvider } from "./src/contexts/PreferencesContext";
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext";
import { LanguageProvider } from "./src/contexts/LanguageContext";

function ThemedStatusBar() {
  const { theme } = useTheme();
  return <StatusBar style={theme === "dark" ? "light" : "dark"} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <PreferencesProvider>
              <RootNavigator />
              <ThemedStatusBar />
            </PreferencesProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
