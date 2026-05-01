import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "coms.session";

export async function getSession() {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function setSession(session) {
  if (!session) {
    await AsyncStorage.removeItem(SESSION_KEY);
    return;
  }
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function getAccessToken() {
  const session = await getSession();
  return session?.access_token ?? null;
}
