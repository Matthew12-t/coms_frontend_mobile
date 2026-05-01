import { Text, View } from "react-native";

function PeakHistogram({ values, labels = [], activeIndex = -1, height = 60 }) {
  const max = Math.max(...values, 1);

  return (
    <View>
      <View
        className="flex-row items-end justify-between"
        style={{ height }}
      >
        {values.map((value, index) => {
          const ratio = value / max;
          const isActive = index === activeIndex;
          return (
            <View
              key={index}
              style={{ height: Math.max(ratio * height, 6), width: 18 }}
              className={`rounded-md ${isActive ? "bg-[#0B2A5B]" : "bg-slate-200"}`}
            />
          );
        })}
      </View>
      {labels.length ? (
        <View className="mt-2 flex-row justify-between">
          {labels.map((label, index) => (
            <Text
              key={index}
              className={`w-[18px] text-center text-[10px] ${
                index === activeIndex
                  ? "font-bold text-[#0B2A5B]"
                  : "text-slate-400"
              }`}
            >
              {label}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

export default PeakHistogram;
