import { useContext, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Star, RefreshCw, Plus } from "lucide-react-native";

import api from "../lib/api";
import SectionLabel from "../components/SectionLabel";
import BestChoiceCard from "../components/BestChoiceCard";
import CanteenAccordionCard from "../components/CanteenAccordionCard";
import CampusMapPreview from "../components/CampusMapPreview";
import DashboardRail from "../components/DashboardRail";
import AddFavoriteModal from "../components/AddFavoriteModal";
import { MOCK_CARD_CONFIGS, LIVE_CARD_CONFIG } from "../lib/mockData";
import { useTheme } from "../contexts/ThemeContext";
import { PreferencesContext } from "../contexts/PreferencesContext";

const ICON_KEYS = ["utensils", "coffee", "building"];
const pickIconKey = (index) => ICON_KEYS[index % ICON_KEYS.length];

const pickBestChoice = (canteens) =>
  canteens.reduce(
    (best, current) =>
      !best || current.capacity_max > best.capacity_max ? current : best,
    null
  );

const calcMins = (people) => Math.max(1, Math.round(people / 1.5));

function DashboardScreen({ navigation }) {
  const { colors } = useTheme();
  const { preferences, save: savePreferences } = useContext(PreferencesContext);
  const [canteens, setCanteens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liveCount, setLiveCount] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [savingFavorite, setSavingFavorite] = useState(false);

  const favoriteIds = useMemo(
    () => preferences?.favorite_canteen_ids ?? [],
    [preferences]
  );

  const loadCanteens = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/canteens");
      const list = Array.isArray(response.data?.data) ? response.data.data : [];
      setCanteens(list);
    } catch (err) {
      setError(err.message ?? "Failed to load canteens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCanteens();
  }, []);

  const bestChoice = pickBestChoice(canteens);

  useEffect(() => {
    if (!bestChoice?.id) return;
    let cancelled = false;
    api
      .get(`/canteens/${bestChoice.id}/history`, { params: { limit: 1 } })
      .then((res) => {
        if (cancelled) return;
        const latest = res.data?.data?.[0];
        if (latest?.head_count != null) setLiveCount(latest.head_count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [bestChoice?.id]);

  const livePeople = liveCount ?? LIVE_CARD_CONFIG.peopleFallback;
  const liveMins = calcMins(livePeople);

  const grid = useMemo(() => {
    const others = bestChoice
      ? canteens.filter((c) => c.id !== bestChoice.id)
      : canteens;
    if (favoriteIds.length === 0) return others;
    const filtered = others.filter((c) => favoriteIds.includes(c.id));
    if (bestChoice && favoriteIds.includes(bestChoice.id)) {
      return [bestChoice, ...filtered];
    }
    return filtered;
  }, [canteens, favoriteIds, bestChoice]);

  const allCards = useMemo(() => {
    let mockSeed = 0;
    return grid.map((canteen) => {
      const cfg = MOCK_CARD_CONFIGS[mockSeed % MOCK_CARD_CONFIGS.length];
      mockSeed += 1;
      return {
        canteen,
        tone: cfg.tone,
        caption: cfg.caption,
        histogram: cfg.histogram,
        activeIndex: cfg.active,
        mins: cfg.mins,
        people: cfg.people,
      };
    });
  }, [grid]);

  const mutateFavorites = async (nextIds) => {
    if (!preferences) throw new Error("Please sign in to save favorites.");
    setSavingFavorite(true);
    try {
      await savePreferences({ favorite_canteen_ids: nextIds });
    } finally {
      setSavingFavorite(false);
    }
  };

  const handleAddFavorite = (canteen) => {
    if (favoriteIds.includes(canteen.id)) return Promise.resolve();
    return mutateFavorites([...favoriteIds, canteen.id]);
  };

  const handleRemoveFavorite = (canteen) =>
    mutateFavorites(favoriteIds.filter((id) => id !== canteen.id));

  const handleRemoveFromCard = async (canteen) => {
    try {
      await handleRemoveFavorite(canteen);
    } catch (err) {
      const serverMsg = err?.response?.data?.error;
      const isProfileIncomplete =
        serverMsg?.toLowerCase().includes("nim") ||
        serverMsg?.toLowerCase().includes("profile");
      Alert.alert(
        "Failed to Remove",
        isProfileIncomplete
          ? "Complete your profile and set your NIM first."
          : serverMsg ?? err?.message ?? "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-2 mb-4 flex-row items-center justify-between">
          <SectionLabel>TOP RECOMMENDATION</SectionLabel>
          <View className="h-7 w-7 items-center justify-center rounded-full bg-amber-100">
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
          </View>
        </View>

        {loading ? (
          <View className="items-center justify-center py-12">
            <ActivityIndicator color={colors.brand} />
            <Text className="mt-3 text-xs" style={{ color: colors.textSecondary }}>
              Loading canteens...
            </Text>
          </View>
        ) : error ? (
          <View className="items-center justify-center rounded-2xl bg-rose-50 px-4 py-8">
            <Text className="text-sm font-semibold text-rose-600">
              Couldn't load canteens
            </Text>
            <Text className="mt-1 text-center text-xs text-rose-500">{error}</Text>
            <Pressable
              onPress={loadCanteens}
              className="mt-4 flex-row items-center rounded-full bg-rose-600 px-4 py-2"
            >
              <RefreshCw size={14} color="#FFFFFF" />
              <Text className="ml-2 text-xs font-semibold text-white">Retry</Text>
            </Pressable>
          </View>
        ) : canteens.length === 0 ? (
          <View
            className="items-center justify-center rounded-2xl px-4 py-10"
            style={{ backgroundColor: colors.surface }}
          >
            <Text className="text-sm font-semibold" style={{ color: colors.textSecondary }}>
              No canteens available
            </Text>
            <Text className="mt-1 text-xs" style={{ color: colors.textMuted }}>
              Check back again later.
            </Text>
          </View>
        ) : (
          <>
            <BestChoiceCard
              canteen={bestChoice}
              people={livePeople}
              mins={liveMins}
            />

            <View className="mt-6 flex-row items-center justify-between">
              <SectionLabel>ALL CANTEENS</SectionLabel>
              <Pressable
                onPress={() => setModalOpen(true)}
                className="flex-row items-center rounded-full px-3 py-1.5"
                style={{ backgroundColor: colors.brandSoft }}
              >
                <Plus size={12} color={colors.brand} />
                <Text className="ml-1 text-xs font-semibold" style={{ color: colors.brand }}>
                  Manage
                </Text>
              </Pressable>
            </View>

            <View className="mt-3">
              {allCards.map((cfg, index) => (
                <CanteenAccordionCard
                  key={cfg.canteen.id}
                  canteen={cfg.canteen}
                  defaultExpanded={index === 0}
                  iconKey={pickIconKey(index)}
                  tone={cfg.tone}
                  caption={cfg.caption}
                  histogram={cfg.histogram}
                  activeIndex={cfg.activeIndex}
                  mins={cfg.mins}
                  people={cfg.people}
                  onRemove={handleRemoveFromCard}
                />
              ))}
            </View>

            <SectionLabel className="mb-3 mt-4">CAMPUS MAP</SectionLabel>
            <CampusMapPreview
              onPress={() => navigation.navigate("MapsTab")}
              onRefresh={loadCanteens}
            />

            <DashboardRail />
          </>
        )}
      </ScrollView>

      <AddFavoriteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        canteens={canteens}
        favoriteIds={favoriteIds}
        onAdd={handleAddFavorite}
        onRemove={handleRemoveFavorite}
        saving={savingFavorite}
      />
    </>
  );
}

export default DashboardScreen;
