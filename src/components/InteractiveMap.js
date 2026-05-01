import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { MapPin } from "lucide-react-native";

function InteractiveMap({ pins, height = 220 }) {
  const [active, setActive] = useState(pins[0]?.id ?? null);

  return (
    <View
      className="overflow-hidden rounded-2xl bg-slate-200"
      style={{ height }}
    >
      <View className="absolute inset-0 bg-slate-300/40" />
      <View className="absolute inset-0">
        {pins.map((pin) => {
          const isActive = pin.id === active;
          return (
            <Pressable
              key={pin.id}
              onPress={() => setActive(pin.id)}
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
                    className="absolute -top-9 rounded-md bg-[#0B2A5B] px-2 py-1"
                    style={{ minWidth: 80 }}
                  >
                    <Text className="text-center text-[10px] font-semibold text-white">
                      {pin.name}
                    </Text>
                  </View>
                ) : null}
                <MapPin
                  size={28}
                  color={isActive ? "#0B2A5B" : "#F59E0B"}
                  fill={isActive ? "#0B2A5B" : "#F59E0B"}
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
