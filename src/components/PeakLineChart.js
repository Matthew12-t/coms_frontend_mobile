import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

function PeakLineChart({ data, peakIndex }) {
  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    decimalPlaces: 0,
    color: () => "#0B2A5B",
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
    propsForDots: { r: "0" },
    propsForBackgroundLines: { stroke: "transparent" },
    fillShadowGradient: "#0B2A5B",
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
              <View
                className="mt-1 h-2 w-2 rounded-full bg-rose-500"
              />
            </View>
          );
        }}
      />
      <Text className="mt-1 text-center text-xs text-slate-500">
        Traffic typically surges between{" "}
        <Text className="font-semibold text-[#0B2A5B]">
          {peakLabel} - 01:00 PM
        </Text>{" "}
        during lunch breaks.
      </Text>
    </View>
  );
}

export default PeakLineChart;
