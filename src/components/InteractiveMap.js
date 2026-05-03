import { Image, Pressable, Text, View } from "react-native";
import { MapPin } from "lucide-react-native";

import { useTheme } from "../contexts/ThemeContext";

const defaultMap = require("../../assets/default_maps.png");

function InteractiveMap({ pins, activeId, onSelect, height = 220 }) {
  const { colors } = useTheme();
  const fallback = pins[0]?.id ?? null;
  const current = activeId ?? fallback;

  return (
    <View className="overflow-hidden rounded-2xl" style={{ height }}>
      <Image source={defaultMap} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
      <View className="absolute inset-0">
        {pins.map((pin) => {
          const isActive = pin.id === current;
          return (
            <Pressable
              key={pin.id}
              onPress={() => onSelect?.(pin.id)}
              style={{
                position: "absolute",
                left: `${pin.x * 100}%`,
                top: `${pin.y * 100}%`,
                transform: [{ translateX: -14 }, { translateY: -28 }],
              }}
            >
              <View className="items-center">
                {isActive ? (
                  <View
                    className="absolute -top-9 rounded-md px-2 py-1"
                    style={{ minWidth: 80, backgroundColor: colors.brand }}
                  >
                    <Text className="text-center text-[10px] font-semibold text-white">
                      {pin.name}
                    </Text>
                  </View>
                ) : null}
                <MapPin
                  size={28}
                  color={isActive ? colors.brand : "#F59E0B"}
                  fill={isActive ? colors.brand : "#F59E0B"}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default InteractiveMap;
