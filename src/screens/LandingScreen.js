import { useEffect } from "react";
import { Text, View } from "react-native";
import { Radio } from "lucide-react-native";

function LandingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 1600);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center bg-[#F5F6FA]">
      <Radio size={36} color="#0B2A5B" strokeWidth={2.4} />
      <Text className="mt-3 text-3xl font-bold tracking-wider text-[#0B2A5B]">
        C.O.M.S.
      </Text>
    </View>
  );
}

export default LandingScreen;
