import { useEffect, useMemo, useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Search, MapPin, X } from "lucide-react-native";

import StatusPill from "../components/StatusPill";
import PeakHistogram from "../components/PeakHistogram";
import { mapPins, canteenDetails } from "../lib/mockData";
import { fetchCanteens, fetchCanteenHistory } from "../services/canteenService";
import { useTheme } from "../contexts/ThemeContext";

const CANTEEN_IMAGES = {
  borju: require("../../assets/kantin_borju_image.png"),
  sipil: require("../../assets/kantin_sipil_image.png"),
  gku: require("../../assets/kantin_gkutimur_image.png"),
};

const CANTEEN_MAP_IMAGES = {
  borju: require("../../assets/kantin_borju_map.png"),
  sipil: require("../../assets/kantin_sipil_map.png"),
  gku: require("../../assets/kantin_gkutimur_map.png"),
};

const MENU_IMAGES = [
  require("../../assets/menu1.png"),
  require("../../assets/menu2.png"),
  require("../../assets/menu3.png"),
];

const calcMins = (people) => Math.max(1, Math.round(people / 1.5));

const deriveStatus = (density) => {
  if (density < 0.3) return { statusTone: "success", status: "Low Flow" };
  if (density < 0.7) return { statusTone: "neutral", status: "Moderate" };
  return { statusTone: "danger", status: "Peak Flow" };
};

function MenuImageModal({ visible, image, label, onClose }) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-center px-6"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <Pressable onPress={() => {}} className="w-full overflow-hidden rounded-2xl bg-white">
          <Image source={image} style={{ width: "100%", height: 300 }} resizeMode="contain" />
          <View className="flex-row items-center justify-between px-4 py-3">
            <Text className="text-sm font-semibold text-slate-700">{label}</Text>
            <Pressable
              onPress={onClose}
              className="h-7 w-7 items-center justify-center rounded-full bg-slate-100"
            >
              <X size={14} color="#64748B" />
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function MapsScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState("borju");
  const [menuPopup, setMenuPopup] = useState(null);
  const [liveData, setLiveData] = useState(null);
  const [searchBarH, setSearchBarH] = useState(48);

  useEffect(() => {
    if (activeId !== "borju") {
      setLiveData(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const canteens = await fetchCanteens();
        const borju = canteens.find((c) => c.name === "Kantin Borju");
        if (!borju || cancelled) return;
        const history = await fetchCanteenHistory(borju.id, 5);
        if (cancelled) return;
        const latest = history?.[0];
        const headCount = latest?.head_count ?? 0;
        const density = borju.capacity_max ? headCount / borju.capacity_max : 0;
        const histogram = history.map((h) => h.head_count ?? 0).reverse();
        setLiveData({
          inLine: headCount,
          waitMins: calcMins(headCount),
          histogram: histogram.length > 0 ? histogram : [0],
          histogramActive: Math.max(0, histogram.length - 1),
          ...deriveStatus(density),
        });
      } catch {
        if (!cancelled) setLiveData(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeId]);

  const filteredPins = useMemo(() => {
    if (!query.trim()) return mapPins;
    const q = query.toLowerCase();
    return mapPins.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  const showDropdown = query.trim().length > 0 && filteredPins.length > 0;

  const handleSelect = (id) => {
    setActiveId(id);
    setQuery("");
  };

  const base = canteenDetails[activeId] ?? canteenDetails.borju;
  const detail = activeId === "borju" && liveData ? { ...base, ...liveData } : base;

  return (
    <>
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ zIndex: 100, marginTop: 12 }}>
          <View
            className="flex-row items-center rounded-full px-4 py-3"
            style={{ backgroundColor: colors.surface }}
            onLayout={(e) => setSearchBarH(e.nativeEvent.layout.height)}
          >
            <Search size={16} color={colors.textMuted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search canteen..."
              placeholderTextColor={colors.textMuted}
              className="ml-2 flex-1 text-sm"
              style={{ color: colors.textPrimary }}
            />
            {query.length > 0 ? (
              <Pressable onPress={() => setQuery("")}>
                <X size={16} color={colors.textMuted} />
              </Pressable>
            ) : null}
          </View>

          {showDropdown ? (
            <View
              className="absolute left-0 right-0 overflow-hidden rounded-2xl"
              style={{
                top: searchBarH + 6,
                backgroundColor: colors.surface,
                elevation: 10,
                shadowColor: "#000",
                shadowOpacity: 0.12,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
                zIndex: 200,
              }}
            >
              {filteredPins.map((pin, index) => (
                <Pressable
                  key={pin.id}
                  onPress={() => handleSelect(pin.id)}
                  className="flex-row items-center px-4 py-3"
                  style={
                    index < filteredPins.length - 1
                      ? { borderBottomWidth: 1, borderBottomColor: colors.border }
                      : undefined
                  }
                >
                  <MapPin size={14} color={colors.brand} />
                  <Text
                    className="ml-2 text-sm font-medium"
                    style={{ color: colors.textPrimary }}
                  >
                    {pin.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        <View className="mt-4 overflow-hidden rounded-2xl" style={{ height: 220 }}>
          <Image
            source={CANTEEN_MAP_IMAGES[activeId]}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
          <View
            className="absolute top-3 left-3 rounded-full px-3 py-1"
            style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
          >
            <Text className="text-[11px] font-semibold" style={{ color: colors.brand }}>
              {detail.name}
            </Text>
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-xl font-bold" style={{ color: colors.textPrimary }}>
            {detail.name}
          </Text>
          <View className="mt-3 flex-row">
            <View className="flex-1">
              <Text className="text-xs" style={{ color: colors.textMuted }}>
                Location
              </Text>
              <Text
                className="mt-1 text-sm font-semibold"
                style={{ color: colors.textSecondary }}
              >
                {detail.location}
              </Text>
            </View>
            <View className="flex-1 items-end">
              <Text className="text-xs" style={{ color: colors.textMuted }}>
                Operational hours
              </Text>
              <Text
                className="mt-1 text-sm font-semibold"
                style={{ color: colors.textSecondary }}
              >
                {detail.hours}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4 h-40 overflow-hidden rounded-2xl">
          <Image
            source={CANTEEN_IMAGES[activeId]}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>

        <View className="mt-5 flex-row items-center justify-between">
          <View className="flex-row items-baseline">
            <Text className="text-3xl font-bold text-emerald-600">{detail.inLine}</Text>
            <Text className="ml-2 text-sm" style={{ color: colors.textSecondary }}>
              People in line
            </Text>
          </View>
          <StatusPill tone={detail.statusTone}>{detail.status}</StatusPill>
        </View>

        <View className="mt-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold" style={{ color: colors.textSecondary }}>
              Wait Time
            </Text>
            <Text className="text-sm font-semibold" style={{ color: colors.textSecondary }}>
              ~{detail.waitMins} mins
            </Text>
          </View>
          <View className="mt-3">
            <PeakHistogram
              values={detail.histogram}
              activeIndex={detail.histogramActive}
              height={50}
            />
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-base font-semibold" style={{ color: colors.textPrimary }}>
            Menu
          </Text>
          <View className="mt-3 flex-row gap-3">
            {detail.menus.map((menu, i) => (
              <Pressable
                key={menu}
                onPress={() => setMenuPopup(i)}
                className="flex-1 h-32 overflow-hidden rounded-2xl"
              >
                <Image
                  source={MENU_IMAGES[i]}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
                <View
                  className="absolute inset-0 items-end justify-center pb-2"
                  style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
                >
                  <Text className="w-full text-center text-[9px] font-semibold uppercase tracking-widest text-white">
                    {menu}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {menuPopup !== null ? (
        <MenuImageModal
          visible
          image={MENU_IMAGES[menuPopup]}
          label={detail.menus[menuPopup]}
          onClose={() => setMenuPopup(null)}
        />
      ) : null}
    </>
  );
}

export default MapsScreen;
