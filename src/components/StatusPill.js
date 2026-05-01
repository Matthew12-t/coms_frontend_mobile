import { Text, View } from "react-native";

const TONE_STYLES = {
  success: "bg-emerald-100",
  successText: "text-emerald-600",
  danger: "bg-rose-100",
  dangerText: "text-rose-600",
  warning: "bg-amber-100",
  warningText: "text-amber-600",
  neutral: "bg-slate-100",
  neutralText: "text-slate-600",
};

function StatusPill({ tone = "success", children, dot = false }) {
  const bg = TONE_STYLES[tone] ?? TONE_STYLES.neutral;
  const text = TONE_STYLES[`${tone}Text`] ?? TONE_STYLES.neutralText;
  const dotColor =
    tone === "success"
      ? "bg-emerald-500"
      : tone === "danger"
      ? "bg-rose-500"
      : tone === "warning"
      ? "bg-amber-500"
      : "bg-slate-500";

  return (
    <View className={`flex-row items-center self-start rounded-full px-3 py-1 ${bg}`}>
      {dot ? <View className={`mr-1.5 h-2 w-2 rounded-full ${dotColor}`} /> : null}
      <Text className={`text-xs font-semibold ${text}`}>{children}</Text>
    </View>
  );
}

export default StatusPill;
