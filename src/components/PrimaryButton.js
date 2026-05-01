import { Pressable, Text, View } from "react-native";

function PrimaryButton({ label, onPress, icon = null, variant = "solid", className = "" }) {
  const containerByVariant = {
    solid: "bg-[#0B2A5B] active:bg-[#08214A]",
    outline: "border border-[#0B2A5B] bg-white",
    ghost: "bg-white",
    danger: "bg-rose-100 active:bg-rose-200",
  };

  const labelByVariant = {
    solid: "text-white",
    outline: "text-[#0B2A5B]",
    ghost: "text-[#0B2A5B]",
    danger: "text-rose-600",
  };

  return (
    <Pressable
      onPress={onPress}
      className={`w-full flex-row items-center justify-center rounded-2xl py-4 ${containerByVariant[variant]} ${className}`}
    >
      {icon ? <View className="mr-2">{icon}</View> : null}
      <Text className={`text-base font-semibold ${labelByVariant[variant]}`}>
        {label}
      </Text>
    </Pressable>
  );
}

export default PrimaryButton;
