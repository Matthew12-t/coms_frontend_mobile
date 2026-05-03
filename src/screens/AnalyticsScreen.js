import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Clock, MapPin, Info } from "lucide-react-native";

import SegmentedTabs from "../components/SegmentedTabs";
import StatCard from "../components/StatCard";
import DensityRow from "../components/DensityRow";
import PeakLineChart from "../components/PeakLineChart";
import InsightsRail from "../components/InsightsRail";
import { fetchPeakHours, fetchDailyAverages } from "../services/analyticsService";
import { fetchCanteens } from "../services/canteenService";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

const RANGE_TO_API = { today: "day", week: "week", month: "month" };
const DAYS_INDEX = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEK_DAYS  = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTH_STEPS = [1, 5, 10, 15, 20, 25, 30];

const formatHourShort = (h) => {
  if (h === 0) return "12A";
  if (h === 12) return "12P";
  return h < 12 ? `${h}A` : `${h - 12}P`;
};

const sampleEvery = (arr, step) => arr.filter((_, i) => i % step === 0);

const buildPeakDay = (raw) => {
  const byHour = Object.fromEntries(raw.map((r) => [r.hour, r.avg_head_count]));
  const all = Array.from({ length: 24 }, (_, h) => ({
    label: formatHourShort(h),
    value: Math.round(byHour[h] ?? 0),
  }));
  const sampled = sampleEvery(all, 4);
  return {
    labels: sampled.map((d) => d.label),
    data: sampled.map((d) => d.value),
  };
};

const buildPeakWeek = (raw) => {
  const accum = {};
  for (const { day, avg_head_count } of raw) {
    const name = DAYS_INDEX[new Date(day + "T12:00:00").getDay()];
    if (!accum[name]) accum[name] = { total: 0, count: 0 };
    accum[name].total += avg_head_count;
    accum[name].count += 1;
  }
  return {
    labels: WEEK_DAYS.map((d) => d.slice(0, 3)),
    data: WEEK_DAYS.map((d) =>
      accum[d] ? Math.round(accum[d].total / accum[d].count) : 0
    ),
  };
};

const buildPeakMonth = (raw) => {
  const byDate = Object.fromEntries(
    raw.map((r) => [new Date(r.day + "T12:00:00").getDate(), r.avg_head_count])
  );
  return {
    labels: MONTH_STEPS.map(String),
    data: MONTH_STEPS.map((d) => Math.round(byDate[d] ?? 0)),
  };
};

const buildDailyRows = (raw) => {
  const accum = {};
  for (const { day, avg_head_count } of raw) {
    const name = DAYS_INDEX[new Date(day + "T12:00:00").getDay()];
    if (!accum[name]) accum[name] = { total: 0, count: 0 };
    accum[name].total += avg_head_count;
    accum[name].count += 1;
  }
  const values = WEEK_DAYS.map((d) =>
    accum[d] ? Math.round(accum[d].total / accum[d].count) : 0
  );
  const max = Math.max(...values, 1);
  const min = Math.min(...values.filter((v) => v > 0), Infinity);
  return WEEK_DAYS.map((d, i) => ({
    day: d,
    percent: Math.round((values[i] / max) * 100),
    tone: values[i] > 0 && values[i] === min ? "success" : "navy",
  }));
};

function AnalyticsScreen() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const [range, setRange] = useState("today");
  const [peakChart, setPeakChart] = useState({ labels: [], data: [] });
  const [dailyRows, setDailyRows] = useState([]);
  const [topCanteen, setTopCanteen] = useState(null);
  const [loading, setLoading] = useState(true);

  const RANGES = useMemo(
    () => [
      { id: "today", label: t("analytics.today") },
      { id: "week",  label: t("analytics.week") },
      { id: "month", label: t("analytics.month") },
    ],
    [t]
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetchPeakHours({ range: RANGE_TO_API[range] }),
      fetchDailyAverages({}),
      fetchCanteens(),
    ])
      .then(([peak, avg, canteens]) => {
        if (cancelled) return;
        if (range === "today") setPeakChart(buildPeakDay(peak));
        else if (range === "week") setPeakChart(buildPeakWeek(avg));
        else setPeakChart(buildPeakMonth(avg));
        setDailyRows(buildDailyRows(avg));
        const sorted = [...(canteens ?? [])].sort(
          (a, b) => (b.capacity_max ?? 0) - (a.capacity_max ?? 0)
        );
        setTopCanteen(sorted[0]?.name ?? "—");
      })
      .catch(() => {
        if (cancelled) return;
        setPeakChart({ labels: [], data: [] });
        setDailyRows([]);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [range]);

  const avgLoad =
    peakChart.data.length > 0
      ? Math.round(peakChart.data.reduce((s, v) => s + v, 0) / peakChart.data.length)
      : 0;
  const peakIndex =
    peakChart.data.length > 0 ? peakChart.data.indexOf(Math.max(...peakChart.data)) : 0;

  const cardShadow = {
    shadowColor: "#0B2A5B",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mt-2">
        <SegmentedTabs tabs={RANGES} value={range} onChange={setRange} />
      </View>

      <View className="mt-5 flex-row gap-3">
        <StatCard
          icon={<Clock size={16} color={colors.brand} />}
          label={t("analytics.avgWaitSaved")}
          value={`${avgLoad}`}
        />
        <StatCard
          icon={<MapPin size={16} color={colors.brand} />}
          label={t("analytics.mostVisited")}
          value={topCanteen ?? "—"}
        />
      </View>

      <View
        className="mt-5 rounded-2xl p-5"
        style={[{ backgroundColor: colors.surface }, cardShadow]}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold" style={{ color: colors.brand }}>
            {t("analytics.campusPeakHours")}
          </Text>
          <Info size={16} color={colors.textMuted} />
        </View>
        <View className="mt-3">
          {loading ? (
            <View className="h-[170px] items-center justify-center">
              <ActivityIndicator color={colors.brand} />
            </View>
          ) : peakChart.data.length > 0 ? (
            <PeakLineChart
              data={{
                labels: peakChart.labels,
                datasets: [{ data: peakChart.data }],
                peakIndex,
              }}
              peakIndex={peakIndex}
            />
          ) : (
            <View className="h-[170px] items-center justify-center">
              <Text style={{ color: colors.textMuted }}>{t("analytics.noPeakData")}</Text>
            </View>
          )}
        </View>
      </View>

      <View
        className="mt-5 rounded-2xl p-5"
        style={[{ backgroundColor: colors.surface }, cardShadow]}
      >
        <Text className="text-base font-bold" style={{ color: colors.brand }}>
          {t("analytics.avgDensityPerDay")}
        </Text>
        <Text className="mb-3 mt-0.5 text-xs" style={{ color: colors.textSecondary }}>
          {t("analytics.unitPeople")}
        </Text>
        {dailyRows.map((row) => (
          <DensityRow key={row.day} {...row} />
        ))}
      </View>

      <InsightsRail />
    </ScrollView>
  );
}

export default AnalyticsScreen;
