import { Pressable, Text, View } from "react-native";

function SwitchRow({ icon, title, subtitle, value, onChange, accent = "navy" }) {
  const trackOn = accent === "emerald" ? "bg-emerald-400" : "bg-[#0B2A5B]";
  const trackOff = "bg-slate-200";

  return (
    <View className="flex-row items-center">
      {icon ? (
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          {icon}
        </View>
      ) : null}
      <View className="flex-1">
        <Text className="text-sm font-semibold text-slate-800">{title}</Text>
        {subtitle ? (
          <Text className="text-xs text-slate-500">{subtitle}</Text>
        ) : null}
      </View>
      <Pressable
        onPress={() => onChange(!value)}
        className={`h-7 w-12 justify-center rounded-full px-1 ${
          value ? trackOn : trackOff
        }`}
      >
        <View
          className="h-5 w-5 rounded-full bg-white"
          style={{
            transform: [{ translateX: value ? 18 : 0 }],
          }}
        />
      </Pressable>
    </View>
  );
}

export default SwitchRow;
