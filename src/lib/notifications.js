import { Platform } from "react-native";

import { updatePreferences } from "../services/preferencesService";

let configured = false;

const ensureModule = async () => {
  try {
    const Notifications = await import("expo-notifications");
    if (!configured) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      configured = true;
    }
    return Notifications;
  } catch {
    return null;
  }
};

export const registerForPushNotifications = async () => {
  const Notifications = await ensureModule();
  if (!Notifications) return null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") return null;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  const tokenResponse = await Notifications.getExpoPushTokenAsync();
  const token = tokenResponse?.data ?? null;
  if (token) {
    try {
      await updatePreferences({ push_token: token });
    } catch {}
  }
  return token;
};

export const showLocalNotification = async (title, body) => {
  const Notifications = await ensureModule();
  if (!Notifications) return;
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
};
