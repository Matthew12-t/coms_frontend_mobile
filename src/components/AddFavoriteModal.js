import { useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { MapPin, Plus, X, Star, Trash2 } from "lucide-react-native";

import { useTheme } from "../contexts/ThemeContext";

function ActionRow({ canteen, isFavorited, onAdd, onRemove, busy, disabled, colors }) {
  const Icon = isFavorited ? Trash2 : Plus;
  const bg = isFavorited ? "rgba(244,63,94,0.12)" : colors.brand;
  const fg = isFavorited ? "#DC2626" : "#FFFFFF";

  return (
    <View
      className="flex-row items-center justify-between rounded-xl px-4 py-3"
      style={{ backgroundColor: colors.surfaceMuted }}
    >
      <View className="flex-1 pr-3">
        <Text className="text-sm font-semibold" style={{ color: colors.brand }}>
          {canteen.name}
        </Text>
        {canteen.location ? (
          <View className="mt-0.5 flex-row items-center">
            <MapPin size={12} color={colors.textMuted} />
            <Text className="ml-1 text-xs" style={{ color: colors.textSecondary }}>
              {canteen.location}
            </Text>
          </View>
        ) : null}
      </View>

      <Pressable
        onPress={() => (isFavorited ? onRemove(canteen) : onAdd(canteen))}
        disabled={disabled || busy}
        className="h-8 w-8 items-center justify-center rounded-full"
        style={{ backgroundColor: bg, opacity: disabled || busy ? 0.6 : 1 }}
      >
        {busy ? (
          <ActivityIndicator size="small" color={fg} />
        ) : (
          <Icon size={14} color={fg} />
        )}
      </Pressable>
    </View>
  );
}

function AddFavoriteModal({ open, onClose, canteens, favoriteIds, onAdd, onRemove, saving }) {
  const { colors } = useTheme();
  const [error, setError] = useState(null);
  const [pendingId, setPendingId] = useState(null);

  if (!open) return null;

  const favorites = canteens.filter((c) => favoriteIds.includes(c.id));
  const available = canteens.filter((c) => !favoriteIds.includes(c.id));

  const wrap = async (fn, canteen) => {
    setError(null);
    setPendingId(canteen.id);
    try {
      await fn(canteen);
    } catch (err) {
      const serverMsg = err?.response?.data?.error;
      const isProfileIncomplete =
        serverMsg?.toLowerCase().includes("nim") ||
        serverMsg?.toLowerCase().includes("profile");
      setError(
        isProfileIncomplete
          ? "Complete your profile and set your NIM first."
          : serverMsg ?? err?.message ?? "Something went wrong. Please try again."
      );
    } finally {
      setPendingId(null);
    }
  };

  return (
    <Modal transparent animationType="fade" visible={open} onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-center px-4"
        style={{ backgroundColor: "rgba(15,23,42,0.4)" }}
      >
        <Pressable
          onPress={() => {}}
          className="w-full overflow-hidden rounded-2xl"
          style={{ backgroundColor: colors.surface, maxWidth: 480 }}
        >
          <View
            className="flex-row items-start justify-between px-5 py-4"
            style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
          >
            <View className="flex-1 pr-3">
              <View className="flex-row items-center">
                <Star size={16} color="#F59E0B" />
                <Text
                  className="ml-2 text-base font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  Manage Favorites
                </Text>
              </View>
              <Text className="mt-1 text-xs" style={{ color: colors.textSecondary }}>
                Add or remove canteens from your dashboard.
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              className="h-7 w-7 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.surfaceMuted }}
            >
              <X size={14} color={colors.textMuted} />
            </Pressable>
          </View>

          <ScrollView className="px-5 py-4" style={{ maxHeight: 420 }}>
            {favorites.length > 0 ? (
              <View className="mb-4">
                <Text
                  className="mb-2 text-[10px] font-bold tracking-widest"
                  style={{ color: colors.textMuted }}
                >
                  YOUR FAVORITES
                </Text>
                <View style={{ gap: 8 }}>
                  {favorites.map((canteen) => (
                    <ActionRow
                      key={canteen.id}
                      canteen={canteen}
                      isFavorited
                      onRemove={(c) => wrap(onRemove, c)}
                      busy={pendingId === canteen.id}
                      disabled={saving}
                      colors={colors}
                    />
                  ))}
                </View>
              </View>
            ) : null}

            {available.length > 0 ? (
              <View>
                <Text
                  className="mb-2 text-[10px] font-bold tracking-widest"
                  style={{ color: colors.textMuted }}
                >
                  ADD CANTEEN
                </Text>
                <View style={{ gap: 8 }}>
                  {available.map((canteen) => (
                    <ActionRow
                      key={canteen.id}
                      canteen={canteen}
                      isFavorited={false}
                      onAdd={(c) => wrap(onAdd, c)}
                      busy={pendingId === canteen.id}
                      disabled={saving}
                      colors={colors}
                    />
                  ))}
                </View>
              </View>
            ) : null}

            {favorites.length === 0 && available.length === 0 ? (
              <Text
                className="py-8 text-center text-sm"
                style={{ color: colors.textSecondary }}
              >
                No canteens available.
              </Text>
            ) : null}

            {error ? (
              <Text className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">
                {error}
              </Text>
            ) : null}
          </ScrollView>

          <View
            className="flex-row justify-end px-5 py-4"
            style={{ borderTopWidth: 1, borderTopColor: colors.border }}
          >
            <Pressable
              onPress={onClose}
              className="rounded-full px-5 py-2"
              style={{ backgroundColor: colors.surfaceMuted }}
            >
              <Text className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                Done
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default AddFavoriteModal;
