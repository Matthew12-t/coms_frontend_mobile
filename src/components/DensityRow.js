import { Text, View } from "react-native";

import { useTheme } from "../contexts/ThemeContext";

function DensityRow({ day, percent, tone = "navy" }) {
  const { colors } = useTheme();
  const trackColor = tone === "success" ? "#34D399" : colors.brand;
  const labelColor =
    tone === "success" ? "#059669" : colors.textSecondary;

  return (
    <View className="mb-3">
      <View className="flex-row items-center justify-between">
        <Text
          className="text-sm"
          style={{ color: labelColor, fontWeight: tone === "success" ? "600" : "400" }}
        >
          {day}
        </Text>
        <Text className="text-sm font-semibold" style={{ color: labelColor }}>
          {percent}%
        </Text>
      </View>
      <View
        className="mt-1.5 h-2 overflow-hidden rounded-full"
        style={{ backgroundColor: colors.surfaceMuted }}
      >
        <View
          className="h-full rounded-full"
          style={{ width: `${percent}%`, backgroundColor: trackColor }}
        />
      </View>
    </View>
  );
}

export default DensityRow;
