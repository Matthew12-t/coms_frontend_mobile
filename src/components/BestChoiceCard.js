import { Text, View } from "react-native";
import { Users, MapPin } from "lucide-react-native";

import StatusPill from "./StatusPill";

function BestChoiceCard({ canteen }) {
  if (!canteen) return null;

  const { name, location, capacity_max } = canteen;

  return (
    <View className="rounded-2xl bg-[#0B2A5B] p-5">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <View className="self-start rounded-full bg-emerald-200/90 px-2.5 py-1">
            <Text className="text-[10px] font-bold tracking-widest text-emerald-900">
              BEST CHOICE FOR YOU
            </Text>
          </View>
          <Text className="mt-3 text-2xl font-bold text-white">{name}</Text>
          <View className="mt-1 flex-row items-center">
            <MapPin size={12} color="rgba(255,255,255,0.7)" />
            <Text className="ml-1 text-xs text-white/70">{location}</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-3xl font-bold text-white">{capacity_max}</Text>
          <Text className="text-[11px] font-medium tracking-widest text-white/70">
            MAX CAPACITY
          </Text>
        </View>
      </View>

      <View className="mt-5 flex-row items-center justify-between rounded-xl bg-white/10 px-4 py-3">
        <View className="flex-row items-center">
          <View className="h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <Users size={18} color="#FFFFFF" />
          </View>
          <View className="ml-3">
            <Text className="text-[10px] font-semibold tracking-widest text-white/70">
              CAPACITY
            </Text>
            <Text className="text-base font-semibold text-white">
              {capacity_max} People
            </Text>
          </View>
        </View>
        <StatusPill tone="success" dot>
          Available
        </StatusPill>
      </View>
    </View>
  );
}

export default BestChoiceCard;
