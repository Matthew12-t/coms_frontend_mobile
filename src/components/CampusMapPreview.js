import { Image, Pressable, Text, View } from "react-native";
import { Map, RotateCw } from "lucide-react-native";

import { useTheme } from "../contexts/ThemeContext";

const defaultMap = require("../../assets/default_maps.png");

function CampusMapPreview({ onPress, onRefresh }) {
  const { colors } = useTheme();

  return (
    <View className="overflow-hidden rounded-2xl" style={{ height: 160 }}>
      <Image source={defaultMap} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
      <View className="absolute inset-0 items-center justify-center">
        <Pressable
          onPress={onPress}
          className="flex-row items-center rounded-full px-5 py-2.5"
          style={{
            backgroundColor: colors.surface,
            shadowColor: "#0F172A",
            shadowOpacity: 0.15,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 3,
          }}
        >
          <Map size={16} color={colors.brand} />
          <Text className="ml-2 text-sm font-semibold" style={{ color: colors.brand }}>
            View Map
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={onRefresh}
        className="absolute bottom-3 right-3 h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: colors.brand }}
      >
        <RotateCw size={16} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

export default CampusMapPreview;
