export const formatNumber = (value) =>
  typeof value === "number" ? value.toLocaleString() : "0";

export const formatCurrencyIDR = (value) =>
  `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

export const densityTone = (level) => {
  switch (level) {
    case "low":
      return "#10B981";
    case "moderate":
      return "#F59E0B";
    case "peak":
      return "#EF4444";
    default:
      return "#94A3B8";
  }
};

export const densityLabel = (level) => {
  switch (level) {
    case "low":
      return "Low Flow";
    case "moderate":
      return "Moderate";
    case "peak":
      return "Peak Hour";
    default:
      return "Unknown";
  }
};
