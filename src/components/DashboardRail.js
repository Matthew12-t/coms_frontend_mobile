import { Text, View } from "react-native";
import { AlertTriangle, TrendingUp } from "lucide-react-native";

import { useTheme } from "../contexts/ThemeContext";

function CardShell({ children, colors }) {
  return (
    <View
      className="rounded-2xl p-5"
      style={{
        backgroundColor: colors.surface,
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

function DashboardRail() {
  const { colors } = useTheme();

  return (
    <View className="mt-5" style={{ gap: 16 }}>
      <CardShell colors={colors}>
        <Text className="text-sm font-semibold" style={{ color: colors.brand }}>
          Quick Insights
        </Text>
        <View
          className="mt-3 rounded-xl px-4 py-3"
          style={{ backgroundColor: colors.brandSoft }}
        >
          <Text
            className="text-[10px] font-semibold tracking-widest"
            style={{ color: colors.brand }}
          >
            CAMPUS AVERAGE
          </Text>
          <Text className="mt-1 text-2xl font-bold" style={{ color: colors.brand }}>
            65% Density
          </Text>
        </View>
        <View className="mt-3 flex-row items-start gap-3 rounded-xl bg-rose-50 px-4 py-3">
          <AlertTriangle size={16} color="#F43F5E" style={{ marginTop: 2 }} />
          <View className="flex-1">
            <Text className="text-sm font-semibold text-rose-600">Kantin Sipil</Text>
            <Text className="text-xs text-rose-500">Trending busiest now</Text>
          </View>
        </View>
      </CardShell>

      <CardShell colors={colors}>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold" style={{ color: colors.brand }}>
            Trend Overview
          </Text>
          <TrendingUp size={14} color="#10B981" />
        </View>
        <Text className="mt-2 text-xs" style={{ color: colors.textSecondary }}>
          Wait time down 6% vs last week.
        </Text>
      </CardShell>
    </View>
  );
}

export default DashboardRail;
