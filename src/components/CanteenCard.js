import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

function CanteenCard({ canteen }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { name, location, capacity_max } = canteen;

  const toggle = () => setIsExpanded((prev) => !prev);

  return (
    <TouchableOpacity
      onPress={toggle}
      activeOpacity={0.8}
      className="bg-white rounded-2xl shadow-md shadow-slate-300 p-5 mb-4"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-lg font-semibold text-slate-800">{name}</Text>
          <Text className="text-sm text-slate-500 mt-1">{location}</Text>
        </View>
        <Text className="text-slate-400 text-base">
          {isExpanded ? "▲" : "▼"}
        </Text>
      </View>

      {isExpanded && (
        <View className="mt-4 pt-4 border-t border-slate-100">
          <Text className="text-sm text-slate-600">
            Kapasitas Maksimal:{" "}
            <Text className="font-semibold text-slate-800">{capacity_max}</Text>
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default CanteenCard;
