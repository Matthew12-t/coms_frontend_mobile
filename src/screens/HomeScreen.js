import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import api from "../lib/api";
import CanteenCard from "../components/CanteenCard";

function HomeScreen() {
  const [canteens, setCanteens] = useState([]);

  useEffect(() => {
    const fetchCanteens = async () => {
      const { data } = await api.get("/canteens");
      setCanteens(data);
    };

    fetchCanteens();
  }, []);

  return (
    <View className="flex-1 px-5 pt-4">
      <Text className="text-3xl font-bold text-slate-800 mb-6">
        C.O.M.S Live
      </Text>
      <FlatList
        data={canteens}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CanteenCard canteen={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

export default HomeScreen;
