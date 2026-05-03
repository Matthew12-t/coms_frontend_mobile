import { Text, View } from "react-native";

import { useTheme } from "../contexts/ThemeContext";

function StatCard({ icon, label, value, valueColor }) {
  const { colors } = useTheme();

  return (
    <View
      className="flex-1 rounded-2xl p-4"
      style={{
        backgroundColor: colors.surface,
        shadowColor: "#0B2A5B",
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
      }}
    >
      <View
        className="mb-2 h-9 w-9 items-center justify-center rounded-full"
        style={{ backgroundColor: colors.surfaceMuted }}
      >
        {icon}
      </View>
      <Text
        className="text-[10px] font-semibold tracking-widest"
        style={{ color: colors.textMuted }}
      >
        {label}
      </Text>
      <Text
        className="mt-1 text-xl font-bold"
        style={{ color: valueColor ?? colors.brand }}
      >
        {value}
      </Text>
    </View>
  );
}

export default StatCard;
