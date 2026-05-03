import { Pressable, Text, View } from "react-native";

import { useTheme } from "../contexts/ThemeContext";

function SwitchRow({ icon, title, subtitle, value, onChange, accent = "navy" }) {
  const { colors } = useTheme();
  const trackOn = accent === "emerald" ? "#34D399" : colors.brand;
  const trackOff = colors.surfaceMuted;

  return (
    <View className="flex-row items-center">
      {icon ? (
        <View
          className="mr-3 h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: colors.surfaceMuted }}
        >
          {icon}
        </View>
      ) : null}
      <View className="flex-1">
        <Text className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-xs" style={{ color: colors.textSecondary }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Pressable
        onPress={() => onChange(!value)}
        className="h-7 w-12 justify-center rounded-full px-1"
        style={{ backgroundColor: value ? trackOn : trackOff }}
      >
        <View
          className="h-5 w-5 rounded-full bg-white"
          style={{ transform: [{ translateX: value ? 18 : 0 }] }}
        />
      </Pressable>
    </View>
  );
}

export default SwitchRow;
