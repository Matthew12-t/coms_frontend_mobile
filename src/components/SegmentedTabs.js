import { Pressable, Text, View } from "react-native";

function SegmentedTabs({ tabs, value, onChange }) {
  return (
    <View className="flex-row">
      {tabs.map((tab) => {
        const active = value === tab.id;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            className={`mr-2 rounded-full px-5 py-2 ${
              active ? "bg-[#0B2A5B]" : "bg-white border border-slate-200"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                active ? "text-white" : "text-slate-500"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default SegmentedTabs;
