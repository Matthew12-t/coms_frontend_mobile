import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Clock, MapPin, Info, Map } from "lucide-react-native";

import SegmentedTabs from "../components/SegmentedTabs";
import StatCard from "../components/StatCard";
import DensityRow from "../components/DensityRow";
import PeakLineChart from "../components/PeakLineChart";
import { peakHoursData, averageDensity } from "../lib/mockData";

const RANGES = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
];

function AnalyticsScreen({ navigation }) {
  const [range, setRange] = useState("today");

  return (
    <ScrollView
      className="flex-1 bg-[#F5F6FA]"
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mt-2">
        <SegmentedTabs tabs={RANGES} value={range} onChange={setRange} />
      </View>

      <View className="mt-5 flex-row gap-3">
        <StatCard
          icon={<Clock size={16} color="#0B2A5B" />}
          label="AVG. WAIT TIME SAVED"
          value="12 mins"
        />
        <StatCard
          icon={<MapPin size={16} color="#0B2A5B" />}
          label="MOST VISITED"
          value="Kantin GKU Timur"
        />
      </View>

      <View
        className="mt-5 rounded-2xl bg-white p-5"
        style={{
          shadowColor: "#0B2A5B",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 1,
        }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-[#0B2A5B]">
            Campus Peak Hours
          </Text>
          <Info size={16} color="#94A3B8" />
        </View>
        <View className="mt-3">
          <PeakLineChart data={peakHoursData} peakIndex={peakHoursData.peakIndex} />
        </View>
      </View>

      <View
        className="mt-5 rounded-2xl bg-white p-5"
        style={{
          shadowColor: "#0B2A5B",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 1,
        }}
      >
        <Text className="text-base font-bold text-[#0B2A5B]">
          Average Density per Day
        </Text>
        <Text className="mb-3 mt-0.5 text-xs text-slate-500">
          Unit: % Occupancy
        </Text>
        {averageDensity.map((row) => (
          <DensityRow key={row.day} {...row} />
        ))}
      </View>

      <View className="mt-5 flex-row items-center justify-between rounded-2xl bg-[#0B2A5B] px-5 py-4">
        <View className="flex-1 pr-3">
          <Text className="text-base font-bold text-white">
            Quick Campus View
          </Text>
          <Text className="mt-1 text-xs text-white/70">
            3 High Density zones detected.
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("MapsTab")}
          className="flex-row items-center rounded-full bg-white px-4 py-2"
        >
          <Map size={14} color="#0B2A5B" />
          <Text className="ml-2 text-xs font-bold tracking-wider text-[#0B2A5B]">
            OPEN MAP
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default AnalyticsScreen;
