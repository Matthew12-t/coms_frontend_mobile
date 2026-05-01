import { Pressable, Text, View } from "react-native";

function SocialIconButton({ label, onPress, color = "#0F172A" }) {
  return (
    <Pressable
      onPress={onPress}
      className="h-12 w-12 items-center justify-center rounded-full"
    >
      <View
        className="h-10 w-10 items-center justify-center rounded-full bg-white"
      >
        <Text style={{ color, fontSize: 18, fontWeight: "700" }}>{label}</Text>
      </View>
    </Pressable>
  );
}

export default SocialIconButton;
