import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, BarChart3, Map, User } from "lucide-react-native";
import { View } from "react-native";

import DashboardScreen from "../screens/DashboardScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import MapsScreen from "../screens/MapsScreen";
import ProfileScreen from "../screens/ProfileScreen";

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

function TabIcon({ Icon, focused }) {
  return (
    <View
      className={`h-9 w-12 items-center justify-center rounded-2xl ${
        focused ? "bg-[#E6ECF6]" : ""
      }`}
    >
      <Icon size={20} color={focused ? "#0B2A5B" : "#94A3B8"} />
    </View>
  );
}

function MainTabs({ onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const Icon = ICONS[route.name];
        return {
          headerStyle: { backgroundColor: "#F5F6FA", elevation: 0, shadowOpacity: 0 },
          headerTitleStyle: { color: "#0F172A", fontWeight: "700" },
          headerTitle: TITLES[route.name],
          tabBarIcon: ({ focused }) => <TabIcon Icon={Icon} focused={focused} />,
          tabBarLabel: LABELS[route.name],
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: -2,
          },
          tabBarActiveTintColor: "#0B2A5B",
          tabBarInactiveTintColor: "#94A3B8",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E2E8F0",
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
