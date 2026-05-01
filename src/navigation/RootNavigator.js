import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useAuth } from "../hooks/useAuth";
import { registerForPushNotifications } from "../lib/notifications";

function RootNavigator() {
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (user) registerForPushNotifications();
  }, [user]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F5F6FA]">
        <ActivityIndicator color="#0B2A5B" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStack onLogout={logout} /> : <AuthStack onAuthenticated={() => {}} />}
    </NavigationContainer>
  );
}

export default RootNavigator;
