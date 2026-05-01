import { Text, View } from "react-native";

function StatCard({ icon, label, value, valueClass = "text-[#0B2A5B]" }) {
  return (
    <View
      className="flex-1 rounded-2xl bg-white p-4"
      style={{
        shadowColor: "#0B2A5B",
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
      }}
    >
      <View className="mb-2 h-9 w-9 items-center justify-center rounded-full bg-slate-100">
        {icon}
      </View>
      <Text className="text-[10px] font-semibold tracking-widest text-slate-400">
        {label}
      </Text>
      <Text className={`mt-1 text-xl font-bold ${valueClass}`}>{value}</Text>
    </View>
  );
}

export default StatCard;
