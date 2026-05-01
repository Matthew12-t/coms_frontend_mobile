import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import SocialIconButton from "../components/SocialIconButton";
import { useAuth } from "../hooks/useAuth";

const SOCIALS = [
  { id: "twitter", label: "𝕏", color: "#1D9BF0" },
  { id: "google", label: "G", color: "#DB4437" },
  { id: "apple", label: "A", color: "#0F172A" },
  { id: "facebook", label: "f", color: "#1877F2" },
];

function LoginScreen({ onAuthenticated, navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const canSubmit = email.length > 0 && password.length > 0 && !submitting;

  const handleLogin = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      onAuthenticated?.();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-[#0B2A5B]"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="h-40 bg-[#0B2A5B]" />
        <View
          className="flex-1 rounded-t-[40px] bg-white px-6 pb-10 pt-10"
          style={{ minHeight: 600 }}
        >
          <Text className="text-center text-4xl font-extrabold text-slate-900">
            Login
          </Text>

          <View className="mt-10 gap-5">
            <View>
              <Text className="mb-2 text-sm text-slate-700">Email</Text>
              <View className="rounded-2xl border border-slate-200 px-4 py-3">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  placeholderTextColor="#94A3B8"
                  className="text-sm text-slate-800"
                />
              </View>
            </View>

            <View>
              <Text className="mb-2 text-sm text-slate-700">Password</Text>
              <View className="rounded-2xl border border-slate-200 px-4 py-3">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Enter your password"
                  placeholderTextColor="#94A3B8"
                  className="text-sm text-slate-800"
                />
              </View>
            </View>
          </View>

          {error && (
            <Text className="mt-4 text-center text-xs text-rose-600">{error}</Text>
          )}

          <View className="mt-8">
            <PrimaryButton
              label={submitting ? "Logging in..." : "Login"}
              onPress={handleLogin}
            />
          </View>

          <View className="mt-8 flex-row items-center">
            <View className="h-px flex-1 bg-slate-200" />
            <Text className="mx-3 text-xs text-slate-500">Login with</Text>
            <View className="h-px flex-1 bg-slate-200" />
          </View>

          <View className="mt-5 flex-row justify-center gap-4">
            {SOCIALS.map((s) => (
              <SocialIconButton key={s.id} label={s.label} color={s.color} />
            ))}
          </View>

          <View className="mt-8 flex-row justify-center">
            <Text className="text-sm text-slate-600">
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => navigation?.navigate?.("Register")}>
              <Text className="text-sm font-bold text-[#0B2A5B]">
                Sign up for free!
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
