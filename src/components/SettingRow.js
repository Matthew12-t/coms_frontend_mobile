import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

function SettingRow({ icon, label, value, onPress, showChevron = false, divider = false }) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center py-3 ${divider ? "border-b border-slate-100" : ""}`}
    >
      <View className="mr-3">{icon}</View>
      <Text className="flex-1 text-sm text-slate-700">{label}</Text>
      {value ? (
        <Text className="mr-2 text-sm text-slate-500">{value}</Text>
      ) : null}
      {showChevron ? <ChevronRight size={16} color="#94A3B8" /> : null}
    </Pressable>
  );
}

export default SettingRow;
