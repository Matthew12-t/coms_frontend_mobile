import api from "../lib/api";

export const listNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data?.data ?? [];
};

export const subscribeNotification = async (canteenId, threshold) => {
  const { data } = await api.post("/notifications", {
    canteen_id: canteenId,
    threshold,
  });
  return data?.data;
};

export const unsubscribeNotification = async (id) => {
  await api.delete(`/notifications/${id}`);
};
