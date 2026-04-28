import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return (
    <SafeAreaView className="bg-slate-100 flex-1">
      <HomeScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
