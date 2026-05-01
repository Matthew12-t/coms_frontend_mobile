import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabs from "./MainTabs";
import CanteenDetailScreen from "../screens/CanteenDetailScreen";

const Stack = createNativeStackNavigator();

function MainStack({ onLogout }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#F5F6FA" },
        headerTitleStyle: { color: "#0F172A", fontWeight: "700" },
      }}
    >
      <Stack.Screen name="Tabs" options={{ headerShown: false }}>
        {(props) => <MainTabs {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen
        name="CanteenDetail"
        component={CanteenDetailScreen}
        options={{ title: "Canteen" }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
