import { Text } from "react-native";

import { useTheme } from "../contexts/ThemeContext";

function SectionLabel({ children, className = "" }) {
  const { colors } = useTheme();
  return (
    <Text
      className={`text-xs font-semibold tracking-[2px] ${className}`}
      style={{ color: colors.textMuted }}
    >
      {children}
    </Text>
  );
}

export default SectionLabel;
