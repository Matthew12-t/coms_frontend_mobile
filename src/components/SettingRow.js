import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

import { useTheme } from "../contexts/ThemeContext";

function SettingRow({ icon, label, value, onPress, showChevron = false, divider = false }) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center py-3"
      style={
        divider
          ? { borderBottomWidth: 1, borderBottomColor: colors.border }
          : undefined
      }
    >
      <View className="mr-3">{icon}</View>
      <Text className="flex-1 text-sm" style={{ color: colors.textPrimary }}>
        {label}
      </Text>
      {value ? (
        <Text className="mr-2 text-sm" style={{ color: colors.textSecondary }}>
          {value}
        </Text>
      ) : null}
      {showChevron ? <ChevronRight size={16} color={colors.textMuted} /> : null}
    </Pressable>
  );
}

export default SettingRow;
