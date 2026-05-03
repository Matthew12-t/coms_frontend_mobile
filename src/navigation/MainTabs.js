import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, BarChart3, Map, User } from "lucide-react-native";
import { View } from "react-native";

import DashboardScreen from "../screens/DashboardScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import MapsScreen from "../screens/MapsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useTheme } from "../contexts/ThemeContext";

const Tab = createBottomTabNavigator();

const ICONS = {
  HomeTab: Home,
  AnalyticsTab: BarChart3,
  MapsTab: Map,
  ProfileTab: User,
};

const LABELS = {
  HomeTab: "Home",
  AnalyticsTab: "Analytics",
  MapsTab: "Maps",
  ProfileTab: "Profile",
};

const TITLES = {
  HomeTab: "Dashboard",
  AnalyticsTab: "Analytics",
  MapsTab: "Maps",
  ProfileTab: "Profile",
};

function TabIcon({ Icon, focused, colors }) {
  return (
    <View
      className="h-9 w-12 items-center justify-center rounded-2xl"
      style={{ backgroundColor: focused ? colors.brandSoft : "transparent" }}
    >
      <Icon size={20} color={focused ? colors.brand : colors.textMuted} />
    </View>
  );
}

function MainTabs({ onLogout }) {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const Icon = ICONS[route.name];
        return {
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: { color: colors.textPrimary, fontWeight: "700" },
          headerTitle: TITLES[route.name],
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={Icon} focused={focused} colors={colors} />
          ),
          tabBarLabel: LABELS[route.name],
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: -2,
          },
          tabBarActiveTintColor: colors.brand,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 64,
            paddingTop: 6,
            paddingBottom: 8,
          },
        };
      }}
    >
      <Tab.Screen name="HomeTab" component={DashboardScreen} />
      <Tab.Screen name="AnalyticsTab" component={AnalyticsScreen} />
      <Tab.Screen name="MapsTab" component={MapsScreen} />
      <Tab.Screen name="ProfileTab">
        {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default MainTabs;
