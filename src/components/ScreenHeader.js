import { Text, View } from "react-native";

function ScreenHeader({ title }) {
  return (
    <View className="bg-[#F5F6FA] px-5 pb-2 pt-2">
      <Text className="text-xl font-bold text-slate-800">{title}</Text>
    </View>
  );
}

export default ScreenHeader;
