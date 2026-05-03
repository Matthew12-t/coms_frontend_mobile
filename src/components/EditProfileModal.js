import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { X } from "lucide-react-native";

import { useTheme } from "../contexts/ThemeContext";

function Field({ label, value, onChangeText, placeholder, colors }) {
  return (
    <View className="mb-3">
      <Text
        className="mb-1 text-xs font-semibold"
        style={{ color: colors.textSecondary }}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        className="rounded-xl border px-3 py-2.5 text-sm"
        style={{
          borderColor: colors.border,
          color: colors.textPrimary,
          backgroundColor: colors.surface,
        }}
      />
    </View>
  );
}

function EditProfileModal({ visible, initial, onSave, onClose }) {
  const { colors } = useTheme();
  const [form, setForm] = useState({
    full_name: initial?.full_name ?? "",
    student_id: initial?.student_id ?? "",
    major: initial?.major ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const setField = (key) => (text) =>
    setForm((prev) => ({ ...prev, [key]: text }));

  const handleSubmit = async () => {
    setSaving(true);
    setErrorMessage(null);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.error ?? err?.message ?? "Failed to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-center px-6"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        <Pressable
          onPress={() => {}}
          className="w-full rounded-2xl p-5"
          style={{ backgroundColor: colors.surface }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold" style={{ color: colors.textPrimary }}>
              Edit Profile
            </Text>
            <Pressable
              onPress={onClose}
              className="h-7 w-7 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.surfaceMuted }}
            >
              <X size={14} color={colors.textMuted} />
            </Pressable>
          </View>

          <View className="mt-4">
            <Field
              label="Full Name"
              value={form.full_name}
              onChangeText={setField("full_name")}
              placeholder="Your full name"
              colors={colors}
            />
            <Field
              label="Student ID (NIM)"
              value={form.student_id}
              onChangeText={setField("student_id")}
              placeholder="e.g. 18223096"
              colors={colors}
            />
            <Field
              label="Major"
              value={form.major}
              onChangeText={setField("major")}
              placeholder="e.g. Information Systems - ITB"
              colors={colors}
            />

            {errorMessage ? (
              <Text className="mt-1 text-xs font-medium text-rose-600">
                {errorMessage}
              </Text>
            ) : null}

            <View className="mt-2 flex-row gap-3">
              <Pressable
                onPress={onClose}
                disabled={saving}
                className="flex-1 items-center rounded-full py-3"
                style={{ backgroundColor: colors.surfaceMuted }}
              >
                <Text className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={handleSubmit}
                disabled={saving}
                className="flex-1 flex-row items-center justify-center rounded-full py-3"
                style={{ backgroundColor: colors.brand, opacity: saving ? 0.6 : 1 }}
              >
                {saving ? <ActivityIndicator size="small" color="#FFFFFF" /> : null}
                <Text className="ml-2 text-sm font-semibold text-white">
                  {saving ? "Saving..." : "Save"}
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default EditProfileModal;
