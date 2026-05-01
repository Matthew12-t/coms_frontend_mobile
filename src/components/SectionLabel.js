import { Text } from "react-native";

function SectionLabel({ children, className = "" }) {
  return (
    <Text
      className={`text-xs font-semibold tracking-[2px] text-slate-400 ${className}`}
    >
      {children}
    </Text>
  );
}

export default SectionLabel;
