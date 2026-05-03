import { useEffect } from "react";
import { ActivityIndicator, Linking, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useAuth } from "../hooks/useAuth";

const CALLBACK_PREFIX = "coms://auth/callback";

function RootNavigator() {
  const { user, loading, logout, verifyCallback } = useAuth();

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url?.startsWith(CALLBACK_PREFIX)) verifyCallback(url);
    });

    const sub = Linking.addEventListener("url", ({ url }) => {
      if (url?.startsWith(CALLBACK_PREFIX)) verifyCallback(url);
    });

    return () => sub.remove();
  }, [verifyCallback]);

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
