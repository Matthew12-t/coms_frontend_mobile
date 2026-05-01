import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
} from "react-native";
import {
  ChevronDown,
  ChevronUp,
  Users,
  MapPin,
  Utensils,
  Coffee,
  Building2,
} from "lucide-react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ICONS = {
  utensils: Utensils,
  coffee: Coffee,
  building: Building2,
};

function CanteenAccordionCard({ canteen, defaultExpanded = false, iconKey = "utensils" }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (!canteen) return null;

  const { name, location, capacity_max } = canteen;
  const Icon = ICONS[iconKey] ?? Utensils;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <Pressable
      onPress={toggle}
      className="mb-3 rounded-2xl bg-white px-4 py-4"
      style={{
        shadowColor: "#0B2A5B",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
            <Icon size={20} color="#0B2A5B" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-semibold text-[#0B2A5B]">
              {name}
            </Text>
            <View className="mt-1 flex-row items-center">
              <MapPin size={11} color="#64748B" />
              <Text className="ml-1 text-xs text-slate-500">{location}</Text>
            </View>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-base font-bold text-[#0B2A5B]">
            {capacity_max}
          </Text>
          <Text className="text-[9px] font-semibold tracking-widest text-slate-400">
            CAPACITY
          </Text>
        </View>
      </View>

      {expanded ? (
        <View className="mt-4">
          <View className="flex-row gap-2">
            <View className="flex-1 flex-row items-center rounded-lg bg-slate-50 px-3 py-2">
              <Users size={14} color="#64748B" />
              <Text className="ml-2 text-xs text-slate-600">
                Max {capacity_max} people
              </Text>
            </View>
            <View className="flex-1 flex-row items-center rounded-lg bg-slate-50 px-3 py-2">
              <MapPin size={14} color="#64748B" />
              <Text className="ml-2 text-xs text-slate-600" numberOfLines={1}>
                {location}
              </Text>
            </View>
          </View>
        </View>
      ) : null}

      <View className="mt-3 flex-row items-center justify-end">
        {expanded ? (
          <ChevronUp size={16} color="#94A3B8" />
        ) : (
          <ChevronDown size={16} color="#94A3B8" />
        )}
      </View>
    </Pressable>
  );
}

export default CanteenAccordionCard;
