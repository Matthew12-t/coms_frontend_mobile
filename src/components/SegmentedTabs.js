import { Pressable, Text, View } from "react-native";

import { useTheme } from "../contexts/ThemeContext";

function SegmentedTabs({ tabs, value, onChange }) {
  const { colors } = useTheme();

  return (
    <View className="flex-row">
      {tabs.map((tab) => {
        const active = value === tab.id;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            className="mr-2 rounded-full px-5 py-2"
            style={{
              backgroundColor: active ? colors.brand : colors.surface,
              borderWidth: active ? 0 : 1,
              borderColor: colors.border,
            }}
          >
            <Text
              className="text-sm font-semibold"
              style={{ color: active ? "#FFFFFF" : colors.textSecondary }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default SegmentedTabs;
