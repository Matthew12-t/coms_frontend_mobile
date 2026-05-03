import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Clock, Star, AlertTriangle } from "lucide-react-native";

import { fetchCanteens, fetchCanteenHistory } from "../services/canteenService";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const MOCK_PEOPLE = [54, 20];
const MOCK_MINS = [10, 14];
const calcMins = (people) => Math.max(1, Math.round(people / 1.5));

function Card({ children, colors, accent }) {
  return (
    <View
      className="rounded-2xl p-5"
      style={{
        backgroundColor: accent ?? colors.surface,
        shadowColor: "#0B2A5B",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
      }}
    >
      {children}
    </View>
  );
}

function InsightsRail() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [mostVisited, setMostVisited] = useState(null);
  const [criticalPeak, setCriticalPeak] = useState(null);
  const [avgWaitMins, setAvgWaitMins] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const canteens = await fetchCanteens();
        if (!canteens.length || cancelled) return;
        const histories = await Promise.all(
          canteens.map((c) => fetchCanteenHistory(c.id, 1))
        );
        if (cancelled) return;
        const best = canteens.reduce((a, b) =>
          a.capacity_max > b.capacity_max ? a : b
        );
        const bestRealCount = histories[canteens.indexOf(best)]?.[0]?.head_count ?? 0;

        let mockPeopleIdx = 0;
        let mockMinsIdx = 0;
        const withEffective = canteens.map((c) => {
          const isBest = c.id === best.id;
          const headCount = isBest
            ? bestRealCount
            : MOCK_PEOPLE[mockPeopleIdx++ % MOCK_PEOPLE.length];
          const mins = isBest
            ? calcMins(bestRealCount)
            : MOCK_MINS[mockMinsIdx++ % MOCK_MINS.length];
          return {
            ...c,
            headCount,
            mins,
            density: c.capacity_max ? headCount / c.capacity_max : 0,
          };
        });

        setMostVisited(
          withEffective.reduce((a, b) => (a.headCount > b.headCount ? a : b))
        );
        setCriticalPeak(
          withEffective.reduce((a, b) => (a.density > b.density ? a : b))
        );
        const totalMins = withEffective.reduce((s, c) => s + c.mins, 0);
        setAvgWaitMins(Math.round(totalMins / withEffective.length));
      } catch {
        if (!cancelled) {
          setMostVisited(null);
          setCriticalPeak(null);
          setAvgWaitMins(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View className="mt-6" style={{ gap: 12 }}>
      <Text
        className="text-[11px] font-semibold tracking-[2px]"
        style={{ color: colors.textMuted }}
      >
        KEY INSIGHTS
      </Text>

      <Card colors={colors}>
        <View className="flex-row items-start justify-between">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
            <Clock size={18} color="#059669" />
          </View>
          <View className="rounded-full bg-emerald-50 px-2 py-0.5">
            <Text className="text-[10px] font-semibold text-emerald-600">↗ Better</Text>
          </View>
        </View>
        <Text className="mt-4 text-2xl font-bold" style={{ color: colors.textPrimary }}>
          {avgWaitMins != null ? `${avgWaitMins} mins` : "—"}
        </Text>
        <Text className="text-xs" style={{ color: colors.textSecondary }}>
          Avg. Wait Time
        </Text>
        <Text className="mt-2 text-[11px]" style={{ color: colors.textMuted }}>
          Across all canteens right now
        </Text>
      </Card>

      <Card colors={colors}>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-amber-100">
          <Star size={18} color="#F59E0B" />
        </View>
        <Text className="mt-4 text-base font-bold" style={{ color: colors.textPrimary }}>
          {mostVisited?.name ?? "—"}
        </Text>
        <Text className="text-xs" style={{ color: colors.textSecondary }}>
          {t("analytics.mostVisited")}
        </Text>
        <View className="mt-3 flex-row items-center justify-between">
          <Text className="text-xs" style={{ color: colors.textMuted }}>
            Current People
          </Text>
          <Text className="text-xs font-semibold" style={{ color: colors.textSecondary }}>
            {mostVisited?.headCount ?? "—"}
          </Text>
        </View>
      </Card>

      <Card colors={colors} accent="#FEF2F2">
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <View className="h-7 w-7 items-center justify-center rounded-full bg-rose-500">
            <AlertTriangle size={14} color="#FFFFFF" />
          </View>
          <Text className="text-[10px] font-bold tracking-widest text-rose-600">
            CRITICAL PEAK
          </Text>
        </View>
        <Text className="mt-3 text-base font-bold" style={{ color: colors.textPrimary }}>
          {criticalPeak?.name ?? "—"}
        </Text>
        <Text className="mt-1 text-xs" style={{ color: colors.textSecondary }}>
          {criticalPeak != null
            ? `${criticalPeak.headCount} people · ${Math.round(criticalPeak.density * 100)}% capacity`
            : "Loading..."}
        </Text>
      </Card>
    </View>
  );
}

export default InsightsRail;
