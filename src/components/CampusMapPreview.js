import { Pressable, Text, View } from "react-native";
import { Map, RotateCw } from "lucide-react-native";

function CampusMapPreview({ onPress, onRefresh }) {
  return (
    <View
      className="overflow-hidden rounded-2xl bg-slate-300"
      style={{ height: 160 }}
    >
      <View className="absolute inset-0 bg-slate-400/40" />
      <View className="absolute inset-0 items-center justify-center">
        <Pressable
          onPress={onPress}
          className="flex-row items-center rounded-full bg-white px-5 py-2.5"
          style={{
            shadowColor: "#0F172A",
            shadowOpacity: 0.15,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 3,
          }}
        >
          <Map size={16} color="#0B2A5B" />
          <Text className="ml-2 text-sm font-semibold text-[#0B2A5B]">
            View Map
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={onRefresh}
        className="absolute bottom-3 right-3 h-10 w-10 items-center justify-center rounded-full bg-[#0B2A5B]"
      >
        <RotateCw size={16} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

export default CampusMapPreview;
