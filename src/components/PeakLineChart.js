import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { useTheme } from "../contexts/ThemeContext";

const screenWidth = Dimensions.get("window").width;

function PeakLineChart({ data, peakIndex }) {
  const { colors, theme } = useTheme();
  const surfaceHex = theme === "dark" ? "#1E293B" : "#FFFFFF";

  const chartConfig = {
    backgroundGradientFrom: surfaceHex,
    backgroundGradientTo: surfaceHex,
    decimalPlaces: 0,
    color: () => colors.brand,
    labelColor: (opacity = 1) =>
      theme === "dark"
        ? `rgba(203, 213, 225, ${opacity})`
        : `rgba(100, 116, 139, ${opacity})`,
    propsForDots: { r: "0" },
    propsForBackgroundLines: { stroke: "transparent" },
    fillShadowGradient: colors.brand,
    fillShadowGradientOpacity: 0.08,
  };

  const peakLabel = data.labels[peakIndex];
  const peakValue = data.datasets[0].data[peakIndex];

  return (
    <View>
      <LineChart
        data={data}
        width={screenWidth - 72}
        height={170}
        chartConfig={chartConfig}
        bezier
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        withShadow={false}
        withVerticalLabels={true}
        withHorizontalLabels={false}
        style={{ marginLeft: -32 }}
        renderDotContent={({ x, y, index }) => {
          if (index !== peakIndex) return null;
          return (
            <View
              key={`peak-${index}`}
              style={{
                position: "absolute",
                top: y - 32,
                left: x - 22,
                alignItems: "center",
              }}
            >
              <View className="rounded-full bg-rose-500 px-2.5 py-1">
                <Text className="text-[10px] font-bold text-white">PEAK</Text>
              </View>
              <View className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
            </View>
          );
        }}
      />
      <Text className="mt-1 text-center text-xs" style={{ color: colors.textSecondary }}>
        Peak around{" "}
        <Text className="font-semibold" style={{ color: colors.brand }}>
          {peakLabel}
        </Text>{" "}
        ({peakValue} people)
      </Text>
    </View>
  );
}

export default PeakLineChart;
