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
  Clock,
  Trash2,
} from "lucide-react-native";

import StatusPill from "./StatusPill";
import PeakHistogram from "./PeakHistogram";
import { useTheme } from "../contexts/ThemeContext";

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

function CanteenAccordionCard({
  canteen,
  defaultExpanded = false,
  iconKey = "utensils",
  tone,
  caption,
  histogram,
  activeIndex,
  mins,
  people,
  onRemove,
}) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (!canteen) return null;

  const { name, location, capacity_max } = canteen;
  const Icon = ICONS[iconKey] ?? Utensils;
  const hasLiveData = tone && caption;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <Pressable
      onPress={toggle}
      className="mb-3 rounded-2xl px-4 py-4"
      style={{
        backgroundColor: colors.surface,
        shadowColor: "#0B2A5B",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View
            className="h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: colors.surfaceMuted }}
          >
            <Icon size={20} color={colors.brand} />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-semibold" style={{ color: colors.brand }}>
              {name}
            </Text>
            <View className="mt-1 flex-row items-center">
              <MapPin size={11} color={colors.textSecondary} />
              <Text className="ml-1 text-xs" style={{ color: colors.textSecondary }}>
                {location}
              </Text>
            </View>
          </View>
        </View>

        <View className="items-end">
          {hasLiveData ? (
            <StatusPill tone={tone}>{caption}</StatusPill>
          ) : (
            <>
              <Text className="text-base font-bold" style={{ color: colors.brand }}>
                {capacity_max}
              </Text>
              <Text
                className="text-[9px] font-semibold tracking-widest"
                style={{ color: colors.textMuted }}
              >
                CAPACITY
              </Text>
            </>
          )}
        </View>
      </View>

      {expanded ? (
        <View className="mt-4">
          <View className="flex-row gap-2">
            <View
              className="flex-1 flex-row items-center rounded-lg px-3 py-2"
              style={{ backgroundColor: colors.surfaceMuted }}
            >
              <Users size={14} color={colors.textSecondary} />
              <Text className="ml-2 text-xs" style={{ color: colors.textSecondary }}>
                {people != null ? `${people} in line` : `Max ${capacity_max}`}
              </Text>
            </View>
            <View
              className="flex-1 flex-row items-center rounded-lg px-3 py-2"
              style={{ backgroundColor: colors.surfaceMuted }}
            >
              {mins != null ? (
                <>
                  <Clock size={14} color={colors.textSecondary} />
                  <Text
                    className="ml-2 text-xs"
                    style={{ color: colors.textSecondary }}
                    numberOfLines={1}
                  >
                    ~{mins} mins wait
                  </Text>
                </>
              ) : (
                <>
                  <MapPin size={14} color={colors.textSecondary} />
                  <Text
                    className="ml-2 text-xs"
                    style={{ color: colors.textSecondary }}
                    numberOfLines={1}
                  >
                    {location}
                  </Text>
                </>
              )}
            </View>
          </View>

          {histogram ? (
            <View className="mt-3">
              <PeakHistogram values={histogram} activeIndex={activeIndex ?? 2} height={36} />
            </View>
          ) : null}

          {onRemove ? (
            <Pressable
              onPress={() => onRemove(canteen)}
              className="mt-3 flex-row items-center self-end rounded-full px-3 py-1.5"
              style={{ backgroundColor: "rgba(244,63,94,0.1)" }}
            >
              <Trash2 size={12} color="#DC2626" />
              <Text className="ml-1.5 text-xs font-semibold text-rose-600">Remove</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <View className="mt-3 flex-row items-center justify-end">
        {expanded ? (
          <ChevronUp size={16} color={colors.textMuted} />
        ) : (
          <ChevronDown size={16} color={colors.textMuted} />
        )}
      </View>
    </Pressable>
  );
}

export default CanteenAccordionCard;
