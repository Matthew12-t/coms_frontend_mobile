import { Text, View } from "react-native";

function DensityRow({ day, percent, tone = "navy" }) {
  const trackColor =
    tone === "success" ? "bg-emerald-400" : "bg-[#0B2A5B]";

  return (
    <View className="mb-3">
      <View className="flex-row items-center justify-between">
        <Text
          className={`text-sm ${
            tone === "success" ? "text-emerald-600 font-semibold" : "text-slate-700"
          }`}
        >
          {day}
        </Text>
        <Text
          className={`text-sm font-semibold ${
            tone === "success" ? "text-emerald-600" : "text-slate-700"
          }`}
        >
          {percent}%
        </Text>
      </View>
      <View className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
        <View
          className={`h-full rounded-full ${trackColor}`}
          style={{ width: `${percent}%` }}
        />
      </View>
    </View>
  );
}

export default DensityRow;
