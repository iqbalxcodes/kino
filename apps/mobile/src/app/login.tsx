import { Link, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Banner, Field } from "../components/Field";
import { useAuth } from "../lib/auth";
import { c, s } from "../lib/ui";

export default function Login() {
  const { from, registered } = useLocalSearchParams<{ from?: string; registered?: string }>();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace(from || "/"); // balik ke halaman yang tadi diminta (mis. rating)
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}>
      <View style={s.card}>
        <Text style={[s.h1, { marginBottom: 20 }]}>Login</Text>
        {from && <Text style={[s.muted, { marginBottom: 12 }]}>Silakan login dulu untuk melanjutkan.</Text>}
        {registered && <Banner kind="success">Registrasi berhasil. Silakan login.</Banner>}
        {error && <Banner kind="error">{error}</Banner>}

        <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
        <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry autoComplete="current-password" />

        <Pressable
          style={[s.btn, { backgroundColor: c.green }, loading && { opacity: 0.6 }]}
          onPress={submit}
          disabled={loading}
        >
          <Text style={{ color: c.white, fontWeight: "bold" }}>
            {loading ? "Memproses..." : "Login"}
          </Text>
        </Pressable>

        <Text style={{ marginTop: 12 }}>
          Belum punya akun? <Link href="/register" style={{ textDecorationLine: "underline" }}>Register</Link>
        </Text>
      </View>
    </ScrollView>
  );
}
