export const bestChoice = {
  id: "best",
  name: "Kantin Borju",
  waitMins: 5,
  queue: 12,
  status: "Available",
};

export const canteens = [
  {
    id: "gkub1",
    name: "Kantin GKUB 1",
    density: "Moderate Density",
    waitMin: 10,
    waitMax: 15,
    queue: 12,
    distance: 240,
    peakHours: [40, 55, 70, 95, 70, 50, 45],
    peakLabels: ["10 AM", "", "", "BUSY", "", "", "4 PM"],
    activeIndex: 3,
  },
  {
    id: "sipil",
    name: "Kantin Sipil",
    density: "Very Crowded",
    queue: 28,
    waitBadge: "25+",
    badgeTone: "danger",
  },
  {
    id: "gkutimur",
    name: "Kantin GKU Timur",
    density: "Quiet",
    queue: 5,
    waitBadge: "8",
    badgeTone: "success",
  },
];

export const peakHoursData = {
  labels: ["08 AM", "10 AM", "12 PM", "02 PM", "04 PM"],
  datasets: [{ data: [25, 38, 92, 60, 35] }],
  peakIndex: 2,
};

export const averageDensity = [
  { day: "Monday", percent: 68, tone: "navy" },
  { day: "Tuesday", percent: 72, tone: "navy" },
  { day: "Wednesday", percent: 85, tone: "navy" },
  { day: "Thursday (Lowest)", percent: 42, tone: "success" },
  { day: "Friday", percent: 60, tone: "navy" },
];

export const mapPins = [
  { id: "borju", name: "Kantin Borju", x: 0.45, y: 0.42 },
  { id: "gkub", name: "Kantin GKUB 1", x: 0.62, y: 0.3 },
  { id: "sipil", name: "Kantin Sipil", x: 0.3, y: 0.55 },
  { id: "gku", name: "Kantin GKU Timur", x: 0.7, y: 0.65 },
  { id: "labtek", name: "Kantin Labtek V", x: 0.5, y: 0.7 },
];

export const canteenDetail = {
  name: "Kantin Borju",
  location: "Labtek V",
  hours: "08.00-17.00",
  inLine: 12,
  status: "Low Flow",
  waitMins: 8,
  waitChart: [25, 35, 80, 45, 25],
  waitActive: 2,
  menus: ["menu_makan", "daftar_menu", "menu_special"],
};

export const profile = {
  name: "Matthew Sebastian Kurniawan",
  studentId: "18223096",
  major: "Sistem dan Teknologi Informasi - ITB",
};

export const initialPreferences = [
  { id: "sipil", name: "Kantin Sipil", icon: "utensils", enabled: true },
  { id: "gku", name: "Kantin GKU Timur", icon: "landmark", enabled: true },
];

export const initialNotifications = [
  {
    id: "crowd",
    title: "Crowd Alerts",
    subtitle: "Notify when canteens are quiet",
    icon: "bell",
    enabled: true,
  },
  {
    id: "peak",
    title: "Peak Hour Warnings",
    subtitle: "Daily forecast at 11:30 AM",
    icon: "alert-triangle",
    enabled: false,
  },
];
