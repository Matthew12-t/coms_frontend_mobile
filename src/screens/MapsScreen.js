import { useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { Search, Info } from "lucide-react-native";

import InteractiveMap from "../components/InteractiveMap";
import StatusPill from "../components/StatusPill";
import PeakHistogram from "../components/PeakHistogram";
import PrimaryButton from "../components/PrimaryButton";
import { mapPins, canteenDetail } from "../lib/mockData";

function MapsScreen() {
  const [query, setQuery] = useState("");
  const [notified, setNotified] = useState(false);

  return (
    <ScrollView
      className="flex-1 bg-[#F5F6FA]"
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mt-3 flex-row items-center rounded-full bg-white px-4 py-3">
        <Search size={16} color="#94A3B8" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search canteen..."
          placeholderTextColor="#94A3B8"
          className="ml-2 flex-1 text-sm text-slate-700"
        />
      </View>

      <View
        className="mt-4 rounded-2xl bg-white p-4"
        style={{
          shadowColor: "#0B2A5B",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 1,
        }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-[#0B2A5B]">Campus Maps</Text>
          <Info size={16} color="#94A3B8" />
        </View>
        <View className="mt-3">
          <InteractiveMap pins={mapPins} />
        </View>
      </View>

      <View className="mt-5">
        <Text className="text-xl font-bold text-slate-800">
          {canteenDetail.name}
        </Text>
        <View className="mt-3 flex-row">
          <View className="flex-1">
            <Text className="text-xs text-slate-400">Location</Text>
            <Text className="mt-1 text-sm font-semibold text-slate-700">
              {canteenDetail.location}
            </Text>
          </View>
          <View className="flex-1 items-end">
            <Text className="text-xs text-slate-400">Operational hours</Text>
            <Text className="mt-1 text-sm font-semibold text-slate-700">
              {canteenDetail.hours}
            </Text>
          </View>
        </View>
      </View>

      <View
        className="mt-4 h-40 overflow-hidden rounded-2xl bg-slate-200"
      >
        <View className="absolute inset-0 items-center justify-center">
          <Text className="text-xs text-slate-500">[Canteen photo]</Text>
        </View>
      </View>

      <View className="mt-5 flex-row items-center justify-between">
        <View className="flex-row items-baseline">
          <Text className="text-3xl font-bold text-emerald-600">
            {canteenDetail.inLine}
          </Text>
          <Text className="ml-2 text-sm text-slate-500">People in line</Text>
        </View>
        <StatusPill tone="success">{canteenDetail.status}</StatusPill>
      </View>

      <View className="mt-5">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-slate-700">Wait Time</Text>
          <Text className="text-sm font-semibold text-slate-700">
            ~{canteenDetail.waitMins} mins
          </Text>
        </View>
        <View className="mt-3">
          <PeakHistogram
            values={canteenDetail.waitChart}
            activeIndex={canteenDetail.waitActive}
            height={50}
          />
        </View>
      </View>

      <View className="mt-6">
        <Text className="text-base font-semibold text-slate-800">Menu</Text>
        <View className="mt-3 flex-row gap-3">
          {canteenDetail.menus.map((menu) => (
            <View
              key={menu}
              className="flex-1 h-32 items-center justify-center overflow-hidden rounded-2xl bg-slate-100"
            >
              <Text className="text-[10px] uppercase tracking-widest text-slate-400">
                {menu.replace(/_/g, " ")}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="mt-6">
        <PrimaryButton
          label={notified ? "We'll notify you" : "Notify Me"}
          variant={notified ? "ghost" : "outline"}
          onPress={() => setNotified((v) => !v)}
        />
      </View>
    </ScrollView>
  );
}

export default MapsScreen;
