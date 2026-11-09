import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Banner, Field } from "../components/Field";
import { ApiError, api } from "../lib/api";
import { c, s } from "../lib/ui";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    setFieldErrors({});
    setLoading(true);
    try {
      await api("/auth/register", { method: "POST", body: { name, email: email.trim(), password } });
      router.replace({ pathname: "/login", params: { registered: "1" } });
    } catch (e) {
      setError((e as Error).message);
      setFieldErrors((e as ApiError).details || {});
      setLoading(false);
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}>
      <View style={s.card}>
        <Text style={[s.h1, { marginBottom: 20 }]}>Register</Text>
        {error && <Banner kind="error">{error}</Banner>}

        <Field label="Nama" value={name} onChangeText={setName} error={fieldErrors.name} autoComplete="name" maxLength={50} />
        <Field label="Email" value={email} onChangeText={setEmail} error={fieldErrors.email} keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
        <Field label="Password" value={password} onChangeText={setPassword} error={fieldErrors.password} hint="Minimal 6 karakter" secureTextEntry autoComplete="new-password" />

        <Pressable
          style={[s.btn, { backgroundColor: c.green }, loading && { opacity: 0.6 }]}
          onPress={submit}
          disabled={loading}
        >
          <Text style={{ color: c.white, fontWeight: "bold" }}>
            {loading ? "Memproses..." : "Register"}
          </Text>
        </Pressable>

        <Text style={{ marginTop: 12 }}>
          Sudah punya akun? <Link href="/login" style={{ textDecorationLine: "underline" }}>Login</Link>
        </Text>
      </View>
    </ScrollView>
  );
}
