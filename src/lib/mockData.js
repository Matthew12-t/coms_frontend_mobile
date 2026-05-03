export const mapPins = [
  { id: "borju", name: "Kantin Borju", x: 0.45, y: 0.42 },
  { id: "sipil", name: "Kantin Sipil", x: 0.3, y: 0.55 },
  { id: "gku",   name: "Kantin GKU Timur", x: 0.7, y: 0.65 },
];

export const canteenDetails = {
  borju: {
    name: "Kantin Borju",
    location: "Labtek V",
    hours: "08.00–17.00",
    inLine: 12,
    statusTone: "success",
    status: "Low Flow",
    waitMins: 8,
    histogram: [25, 35, 80, 45, 25],
    histogramActive: 2,
    menus: ["Menu Makan", "Daftar Menu", "Special"],
  },
  sipil: {
    name: "Kantin Sipil",
    location: "Gedung Sipil",
    hours: "08.00–16.00",
    inLine: 54,
    statusTone: "danger",
    status: "Peak Now",
    waitMins: 10,
    histogram: [55, 65, 90, 70, 60],
    histogramActive: 2,
    menus: ["Menu Makan", "Daftar Menu", "Minuman"],
  },
  gku: {
    name: "Kantin GKU Timur",
    location: "GKU Timur",
    hours: "08.00–17.00",
    inLine: 20,
    statusTone: "neutral",
    status: "Moderate",
    waitMins: 14,
    histogram: [10, 18, 35, 22, 12],
    histogramActive: 2,
    menus: ["Menu Makan", "Daftar Menu", "Snack"],
  },
};

export const MOCK_CARD_CONFIGS = [
  { tone: "danger",  caption: "Peak Now", histogram: [55, 65, 90, 70, 60], active: 2, mins: 10, people: 54 },
  { tone: "neutral", caption: "Moderate", histogram: [10, 18, 35, 22, 12], active: 2, mins: 14, people: 20 },
];

export const LIVE_CARD_CONFIG = {
  tone: "success",
  caption: "Live Now",
  histogram: [22, 30, 70, 40, 18],
  active: 2,
  peopleFallback: 12,
};
