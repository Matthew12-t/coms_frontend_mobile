import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { Bell } from "lucide-react-native";

import { subscribeNotification } from "../services/notificationService";
import { showLocalNotification } from "../lib/notifications";

const DEFAULT_THRESHOLD = 25;

const NotifyMeButton = ({ canteenId, canteenName }) => {
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handlePress = async () => {
    setSubmitting(true);
    try {
      await subscribeNotification(canteenId, DEFAULT_THRESHOLD);
      setSubscribed(true);
      await showLocalNotification(
        "You're subscribed",
        `We'll alert you when ${canteenName} drops below ${DEFAULT_THRESHOLD} people.`
      );
    } catch (err) {
      Alert.alert("Subscription failed", err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={submitting || subscribed}
      className="flex-row items-center justify-center gap-2 rounded-full bg-[#0B2A5B] px-5 py-3"
    >
      <Bell size={16} color="#FFFFFF" />
      <Text className="text-sm font-semibold text-white">
        {subscribed ? "Subscribed" : "Notify me when quieter"}
      </Text>
    </Pressable>
  );
};

export default NotifyMeButton;
