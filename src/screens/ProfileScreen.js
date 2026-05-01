import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  Bell,
  AlertTriangle,
  Utensils,
  Landmark,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  ShieldCheck,
} from "lucide-react-native";

import SwitchRow from "../components/SwitchRow";
import SettingRow from "../components/SettingRow";
import PrimaryButton from "../components/PrimaryButton";
import {
  profile,
  initialPreferences,
  initialNotifications,
} from "../lib/mockData";
import { clearSession } from "../lib/auth";

const PREF_ICONS = {
  utensils: <Utensils size={18} color="#0B2A5B" />,
  landmark: <Landmark size={18} color="#0B2A5B" />,
};

const NOTIF_ICONS = {
  bell: <Bell size={18} color="#0B2A5B" />,
  "alert-triangle": <AlertTriangle size={18} color="#0B2A5B" />,
};

function ProfileScreen({ onLogout }) {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [notifications, setNotifications] = useState(initialNotifications);

  const togglePreference = (id) =>
    setPreferences((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );

  const toggleNotification = (id) =>
    setNotifications((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );

  const handleLogout = async () => {
    await clearSession();
    onLogout?.();
  };

  return (
    <ScrollView
      className="flex-1 bg-[#F5F6FA]"
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        className="mt-2 items-center rounded-2xl bg-white px-5 pb-5 pt-10"
        style={{
          shadowColor: "#0B2A5B",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 1,
        }}
      >
        <View className="relative">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-amber-200">
            <Text className="text-3xl">👤</Text>
          </View>
          <View className="absolute bottom-1 right-1 h-7 w-7 items-center justify-center rounded-full bg-[#0B2A5B]">
            <ShieldCheck size={14} color="#FFFFFF" />
          </View>
        </View>
        <Text className="mt-4 text-lg font-bold text-slate-800">
          {profile.name}
        </Text>
        <Text className="mt-1 text-sm font-semibold text-[#0B2A5B]">
          {profile.studentId}
        </Text>
        <Text className="mt-1 text-xs text-slate-500">{profile.major}</Text>
      </View>

      <Text className="mb-2 mt-6 text-xl font-bold text-slate-800">
        My Preferences
      </Text>
      <Text className="mb-3 text-[10px] font-semibold tracking-widest text-slate-400">
        CANTEEN PREFERENCES
      </Text>

      <View className="gap-4">
        {preferences.map((pref) => (
          <SwitchRow
            key={pref.id}
            icon={PREF_ICONS[pref.icon]}
            title={pref.name}
            value={pref.enabled}
            onChange={() => togglePreference(pref.id)}
            accent="emerald"
          />
        ))}
      </View>

      <Text className="mb-3 mt-6 text-[10px] font-semibold tracking-widest text-slate-400">
        NOTIFICATION SETTINGS
      </Text>

      <View
        className="rounded-2xl bg-white p-2"
        style={{
          shadowColor: "#0B2A5B",
          shadowOpacity: 0.04,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      >
        {notifications.map((notif, index) => (
          <View
            key={notif.id}
            className={`px-3 py-3 ${
              index < notifications.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <SwitchRow
              icon={NOTIF_ICONS[notif.icon]}
              title={notif.title}
              subtitle={notif.subtitle}
              value={notif.enabled}
              onChange={() => toggleNotification(notif.id)}
            />
          </View>
        ))}
      </View>

      <Text className="mb-2 mt-6 text-xl font-bold text-slate-800">
        Settings & Support
      </Text>

      <View
        className="rounded-2xl bg-white px-4"
        style={{
          shadowColor: "#0B2A5B",
          shadowOpacity: 0.04,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      >
        <SettingRow
          icon={<Palette size={18} color="#0B2A5B" />}
          label="Theme (Light/Dark)"
          value="Light"
          divider
        />
        <SettingRow
          icon={<Globe size={18} color="#0B2A5B" />}
          label="Language"
          value="English (US)"
          divider
        />
        <SettingRow
          icon={<HelpCircle size={18} color="#0B2A5B" />}
          label="Help & Feedback"
          showChevron
        />
      </View>

      <View className="mt-8">
        <PrimaryButton
          label="Log Out"
          variant="danger"
          icon={<LogOut size={16} color="#DC2626" />}
          onPress={handleLogout}
        />
      </View>

      <Text className="mt-6 text-center text-[10px] tracking-widest text-slate-400">
        C.O.M.S. VERSION 2.4.0 • 2024
      </Text>
    </ScrollView>
  );
}

export default ProfileScreen;
