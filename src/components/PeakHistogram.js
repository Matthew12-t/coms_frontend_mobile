import { Text, View } from "react-native";

import { useTheme } from "../contexts/ThemeContext";

function PeakHistogram({ values, labels = [], activeIndex = -1, height = 60 }) {
  const { colors } = useTheme();
  const max = Math.max(...values, 1);

  return (
    <View>
      <View className="flex-row items-end justify-between" style={{ height }}>
        {values.map((value, index) => {
          const ratio = value / max;
          const isActive = index === activeIndex;
          return (
            <View
              key={index}
              style={{
                height: Math.max(ratio * height, 6),
                width: 18,
                backgroundColor: isActive ? colors.brand : colors.surfaceMuted,
                borderRadius: 6,
              }}
            />
          );
        })}
      </View>
      {labels.length ? (
        <View className="mt-2 flex-row justify-between">
          {labels.map((label, index) => {
            const isActive = index === activeIndex;
            return (
              <Text
                key={index}
                className="w-[18px] text-center text-[10px]"
                style={{
                  color: isActive ? colors.brand : colors.textMuted,
                  fontWeight: isActive ? "700" : "400",
                }}
              >
                {label}
              </Text>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

export default PeakHistogram;
