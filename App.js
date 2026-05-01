import "react-native-gesture-handler";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider } from "./src/contexts/AuthContext";
import { PreferencesProvider } from "./src/contexts/PreferencesContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PreferencesProvider>
          <RootNavigator />
          <StatusBar style="dark" />
        </PreferencesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
