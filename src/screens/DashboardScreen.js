import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { Star, RefreshCw } from "lucide-react-native";

import api from "../lib/api";
import SectionLabel from "../components/SectionLabel";
import BestChoiceCard from "../components/BestChoiceCard";
import CanteenAccordionCard from "../components/CanteenAccordionCard";
import CampusMapPreview from "../components/CampusMapPreview";

const ICON_KEYS = ["utensils", "coffee", "building"];

const pickIconKey = (index) => ICON_KEYS[index % ICON_KEYS.length];

const pickBestChoice = (canteens) =>
  canteens.reduce(
    (best, current) =>
      !best || current.capacity_max > best.capacity_max ? current : best,
    null
  );

function DashboardScreen({ navigation }) {
  const [canteens, setCanteens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCanteens = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/canteens");
      const list = Array.isArray(response.data?.data) ? response.data.data : [];
      setCanteens(list);
    } catch (err) {
      setError(err.message ?? "Failed to load canteens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCanteens();
  }, []);

  const bestChoice = pickBestChoice(canteens);
  const others = bestChoice
    ? canteens.filter((c) => c.id !== bestChoice.id)
    : canteens;

  return (
    <ScrollView
      className="flex-1 bg-[#F5F6FA]"
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mt-2 mb-4 flex-row items-center justify-between">
        <SectionLabel>TOP RECOMMENDATION</SectionLabel>
        <View className="h-7 w-7 items-center justify-center rounded-full bg-amber-100">
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
        </View>
      </View>

      {loading ? (
        <View className="items-center justify-center py-12">
          <ActivityIndicator color="#0B2A5B" />
          <Text className="mt-3 text-xs text-slate-500">Loading canteens...</Text>
        </View>
      ) : error ? (
        <View className="items-center justify-center rounded-2xl bg-rose-50 px-4 py-8">
          <Text className="text-sm font-semibold text-rose-600">
            Couldn't load canteens
          </Text>
          <Text className="mt-1 text-center text-xs text-rose-500">{error}</Text>
          <Pressable
            onPress={loadCanteens}
            className="mt-4 flex-row items-center rounded-full bg-rose-600 px-4 py-2"
          >
            <RefreshCw size={14} color="#FFFFFF" />
            <Text className="ml-2 text-xs font-semibold text-white">Retry</Text>
          </Pressable>
        </View>
      ) : canteens.length === 0 ? (
        <View className="items-center justify-center rounded-2xl bg-white px-4 py-10">
          <Text className="text-sm font-semibold text-slate-600">
            No canteens available
          </Text>
          <Text className="mt-1 text-xs text-slate-400">
            Check back again later.
          </Text>
        </View>
      ) : (
        <>
          <BestChoiceCard canteen={bestChoice} />

          <SectionLabel className="mb-3 mt-6">ALL CANTEENS</SectionLabel>
          {others.map((canteen, index) => (
            <CanteenAccordionCard
              key={canteen.id}
              canteen={canteen}
              defaultExpanded={index === 0}
              iconKey={pickIconKey(index)}
            />
          ))}

          <SectionLabel className="mb-3 mt-6">CAMPUS MAP</SectionLabel>
          <CampusMapPreview
            onPress={() => navigation.navigate("MapsTab")}
            onRefresh={loadCanteens}
          />
        </>
      )}
    </ScrollView>
  );
}

export default DashboardScreen;
