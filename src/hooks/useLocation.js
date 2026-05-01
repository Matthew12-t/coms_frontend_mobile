import { useEffect, useState } from "react";

export const useLocation = () => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const Location = await import("expo-location");
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission denied");
          return;
        }
        const result = await Location.getCurrentPositionAsync({});
        if (!active) return;
        setCoords({
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        });
      } catch (err) {
        setError(err.message);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return { coords, error };
};
