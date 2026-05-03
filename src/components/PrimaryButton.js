import { Pressable, Text, View } from "react-native";

import { useTheme } from "../contexts/ThemeContext";

function PrimaryButton({ label, onPress, icon = null, variant = "solid", className = "" }) {
  const { colors } = useTheme();

  const variantStyles = {
    solid:   { bg: colors.brand,        fg: "#FFFFFF",         border: null },
    outline: { bg: colors.surface,      fg: colors.brand,      border: colors.brand },
    ghost:   { bg: colors.surface,      fg: colors.brand,      border: null },
    danger:  { bg: "rgba(244,63,94,0.12)", fg: "#DC2626",      border: null },
  };

  const v = variantStyles[variant] ?? variantStyles.solid;

  return (
    <Pressable
      onPress={onPress}
      className={`w-full flex-row items-center justify-center rounded-2xl py-4 ${className}`}
      style={{
        backgroundColor: v.bg,
        borderWidth: v.border ? 1 : 0,
        borderColor: v.border ?? "transparent",
      }}
    >
      {icon ? <View className="mr-2">{icon}</View> : null}
      <Text className="text-base font-semibold" style={{ color: v.fg }}>
        {label}
      </Text>
    </Pressable>
  );
}

export default PrimaryButton;
