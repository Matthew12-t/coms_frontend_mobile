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
import { useAuth } from "../hooks/useAuth";

function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const canSubmit = email.length > 0 && password.length >= 6 && !submitting;

  const handleRegister = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await register(email, password);
      if (!result?.session) navigation?.navigate?.("Login");
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="h-32 bg-[#0B2A5B]" />
        <View className="flex-1 rounded-t-[40px] bg-white px-6 pb-10 pt-10">
          <Text className="text-center text-4xl font-extrabold text-slate-900">
            Register
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
                  placeholder="Min. 6 characters"
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
              label={submitting ? "Creating..." : "Create account"}
              onPress={handleRegister}
            />
          </View>

          <View className="mt-8 flex-row justify-center">
            <Text className="text-sm text-slate-600">Already have an account? </Text>
            <Pressable onPress={() => navigation?.navigate?.("Login")}>
              <Text className="text-sm font-bold text-[#0B2A5B]">Sign in</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;
