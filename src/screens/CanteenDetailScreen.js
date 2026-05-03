import { ScrollView, Text, View } from "react-native";

import MenuList from "../components/MenuList";
import { useFetch } from "../hooks/useFetch";
import { fetchCanteen, fetchCanteenHistory } from "../services/canteenService";
import { fetchMenusByCanteen } from "../services/menuService";
import { densityLabel, densityTone } from "../utils/format";

function CanteenDetailScreen({ route }) {
  const { canteenId } = route.params;

  const { data: canteen, loading } = useFetch(() => fetchCanteen(canteenId), [canteenId]);
  const { data: history } = useFetch(() => fetchCanteenHistory(canteenId, 24), [canteenId]);
  const { data: menus } = useFetch(() => fetchMenusByCanteen(canteenId), [canteenId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F5F6FA]">
        <Text className="text-sm text-slate-500">Loading...</Text>
      </View>
    );
  }

  if (!canteen) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F5F6FA]">
        <Text className="text-sm text-slate-500">Canteen not found.</Text>
      </View>
    );
  }

  const latest = history?.[0];

  return (
    <ScrollView className="flex-1 bg-[#F5F6FA]" contentContainerStyle={{ padding: 16 }}>
      <View className="rounded-3xl bg-white p-5">
        <Text className="text-xl font-extrabold text-slate-900">{canteen.name}</Text>
        {canteen.description ? (
          <Text className="mt-1 text-xs text-slate-500">{canteen.description}</Text>
        ) : null}

        <View className="mt-4 flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-slate-50 p-3">
            <Text className="text-[10px] uppercase text-slate-500">Capacity</Text>
            <Text className="text-base font-bold text-slate-900">{canteen.capacity}</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-slate-50 p-3">
            <Text className="text-[10px] uppercase text-slate-500">Live</Text>
            <Text className="text-base font-bold text-slate-900">
              {latest?.head_count ?? 0}
            </Text>
          </View>
          <View className="flex-1 rounded-2xl bg-slate-50 p-3">
            <Text className="text-[10px] uppercase text-slate-500">Status</Text>
            <Text
              className="text-base font-bold"
              style={{ color: densityTone(latest?.density_level) }}
            >
              {densityLabel(latest?.density_level)}
            </Text>
          </View>
        </View>

      </View>

      <View className="mt-5 rounded-3xl bg-white p-5">
        <Text className="text-base font-bold text-slate-900">Menu</Text>
        <View className="mt-3">
          <MenuList menus={menus || []} />
        </View>
      </View>
    </ScrollView>
  );
}

export default CanteenDetailScreen;
