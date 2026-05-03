import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import {
  Palette,
  Globe,
  LogOut,
  ShieldCheck,
  Check,
  Pencil,
} from "lucide-react-native";

import SettingRow from "../components/SettingRow";
import PrimaryButton from "../components/PrimaryButton";
import EditProfileModal from "../components/EditProfileModal";
import { fetchProfile, updateProfile } from "../services/profileService";
import { clearSession } from "../lib/auth";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

function OptionPicker({ visible, title, options, selected, onSelect, onClose, colors }) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-center px-8"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        <Pressable
          onPress={() => {}}
          className="w-full rounded-2xl p-5"
          style={{ backgroundColor: colors.surface }}
        >
          <Text className="text-base font-bold" style={{ color: colors.textPrimary }}>
            {title}
          </Text>
          <View className="mt-3">
            {options.map((opt) => {
              const active = opt.value === selected;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => {
                    onSelect(opt.value);
                    onClose();
                  }}
                  className="flex-row items-center justify-between rounded-xl px-3 py-3"
                  style={{ backgroundColor: active ? colors.brandSoft : "transparent" }}
                >
                  <Text
                    className="text-sm"
                    style={{
                      color: active ? colors.brand : colors.textPrimary,
                      fontWeight: active ? "700" : "500",
                    }}
                  >
                    {opt.label}
                  </Text>
                  {active ? <Check size={16} color={colors.brand} /> : null}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function ProfileScreen({ onLogout }) {
  const { colors, theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [profile, setProfile] = useState(null);
  const [picker, setPicker] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile()
      .then(setProfile)
      .catch(() => setProfile({}));
  }, []);

  const handleSaveProfile = async (form) => {
    const updated = await updateProfile(form);
    setProfile(updated);
  };

  const handleLogout = async () => {
    await clearSession();
    onLogout?.();
  };

  const themeOptions = [
    { value: "light", label: t("common.light") },
    { value: "dark",  label: t("common.dark") },
  ];

  const languageOptions = [
    { value: "en", label: t("common.english") },
    { value: "id", label: t("common.indonesian") },
  ];

  const cardShadow = {
    shadowColor: "#0B2A5B",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  };

  const subtleShadow = {
    shadowColor: "#0B2A5B",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  };

  const displayName = profile?.full_name ?? t("profile.noProfile");
  const displayId = profile?.student_id ?? "—";
  const displayMajor = profile?.major ?? "—";

  return (
    <>
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="mt-2 items-center rounded-2xl px-5 pb-5 pt-10"
          style={[{ backgroundColor: colors.surface }, cardShadow]}
        >
          <View className="relative">
            <View className="h-24 w-24 items-center justify-center rounded-full bg-amber-200">
              <Text className="text-3xl">👤</Text>
            </View>
            <View
              className="absolute bottom-1 right-1 h-7 w-7 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.brand }}
            >
              <ShieldCheck size={14} color="#FFFFFF" />
            </View>
          </View>
          <Text className="mt-4 text-lg font-bold" style={{ color: colors.textPrimary }}>
            {displayName}
          </Text>
          <Text className="mt-1 text-sm font-semibold" style={{ color: colors.brand }}>
            {displayId}
          </Text>
          <Text className="mt-1 text-xs" style={{ color: colors.textSecondary }}>
            {displayMajor}
          </Text>

          <Pressable
            onPress={() => setEditing(true)}
            className="mt-4 flex-row items-center rounded-full px-4 py-2"
            style={{ backgroundColor: colors.brand }}
          >
            <Pencil size={12} color="#FFFFFF" />
            <Text className="ml-2 text-xs font-semibold text-white">Edit Profile</Text>
          </Pressable>
        </View>

        <Text
          className="mb-2 mt-6 text-xl font-bold"
          style={{ color: colors.textPrimary }}
        >
          {t("profile.appSettings")}
        </Text>
        <Text
          className="mb-3 text-[10px] font-semibold tracking-widest"
          style={{ color: colors.textMuted }}
        >
          {t("profile.appPreferences")}
        </Text>

        <View
          className="rounded-2xl px-4"
          style={[{ backgroundColor: colors.surface }, subtleShadow]}
        >
          <SettingRow
            icon={<Palette size={18} color={colors.brand} />}
            label={t("profile.themeMode")}
            value={theme === "dark" ? t("common.dark") : t("common.light")}
            onPress={() => setPicker("theme")}
            divider
            showChevron
          />
          <SettingRow
            icon={<Globe size={18} color={colors.brand} />}
            label={t("profile.language")}
            value={language === "id" ? t("common.indonesian") : t("common.english")}
            onPress={() => setPicker("language")}
            showChevron
          />
        </View>

        <View className="mt-8">
          <PrimaryButton
            label={t("profile.logout")}
            variant="danger"
            icon={<LogOut size={16} color="#DC2626" />}
            onPress={handleLogout}
          />
        </View>

        <Text
          className="mt-6 text-center text-[10px] tracking-widest"
          style={{ color: colors.textMuted }}
        >
          {t("profile.version")}
        </Text>
      </ScrollView>

      <OptionPicker
        visible={picker === "theme"}
        title={t("profile.themeMode")}
        options={themeOptions}
        selected={theme}
        onSelect={setTheme}
        onClose={() => setPicker(null)}
        colors={colors}
      />
      <OptionPicker
        visible={picker === "language"}
        title={t("profile.language")}
        options={languageOptions}
        selected={language}
        onSelect={setLanguage}
        onClose={() => setPicker(null)}
        colors={colors}
      />

      {editing ? (
        <EditProfileModal
          visible={editing}
          initial={profile ?? {}}
          onSave={handleSaveProfile}
          onClose={() => setEditing(false)}
        />
      ) : null}
    </>
  );
}

export default ProfileScreen;
