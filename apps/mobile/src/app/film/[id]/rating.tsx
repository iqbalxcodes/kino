import { Link, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Banner } from "../../../components/Field";
import { ApiError, api, RatingsData, useFetch } from "../../../lib/api";
import { useAuth } from "../../../lib/auth";
import { c, s } from "../../../lib/ui";

export default function Rating() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const { data, error, setData } = useFetch<RatingsData>(`/films/${id}/ratings`);

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!rating) return setFormError("Pilih rating 1-10");
    setFormError("");
    setLoading(true);
    try {
      setData(await api<RatingsData>(`/films/${id}/ratings`, { method: "POST", body: { rating, comments } }));
      setComments("");
    } catch (e) {
      setFormError(Object.values((e as ApiError).details || {})[0] ?? (e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 24, gap: 16 }}>
      <View style={{ flexDirection: "row", gap: 24 }}>
        <Pressable onPress={() => router.navigate(`/film/${id}`)}><Text style={{ fontSize: 16 }}>Back</Text></Pressable>
        <Text style={{ fontSize: 16, fontWeight: "700", borderBottomWidth: 2 }}>Rating</Text>
      </View>

      {error && <Banner kind="error">{error}</Banner>}
      {!data && !error && <Text style={s.muted}>Memuat...</Text>}

      {data?.ratings.map((r) => (
        <View key={r.userId} style={[s.card, { padding: 0, overflow: "hidden" }]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 14, borderBottomWidth: 1, borderColor: c.border }}>
            <Text style={{ fontSize: 16 }}>{r.username}</Text>
            <Text style={{ fontSize: 16 }}>{r.rating}/10</Text>
          </View>
          <Text style={{ padding: 14 }}>{r.comments}</Text>
        </View>
      ))}

      {user ? (
        <View style={s.card}>
          {formError && <Banner kind="error">{formError}</Banner>}
          <Text style={{ fontSize: 16, marginBottom: 10 }}>Your Rating here</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <Pressable key={n} onPress={() => setRating(n)}
                style={{ width: 36, height: 36, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: n === rating ? c.text : c.gray }}>
                <Text style={{ color: n === rating ? "#fff" : c.text }}>{n}</Text>
              </Pressable>
            ))}
          </View>
          <TextInput style={[s.input, { minHeight: 90, textAlignVertical: "top", fontStyle: comments ? "normal" : "italic" }]}
            value={comments} onChangeText={setComments} placeholder="type comment here ..." multiline maxLength={1000} />
          <Pressable style={[s.btn, { alignSelf: "flex-end", marginTop: 12 }, loading && { opacity: 0.6 }]} onPress={submit} disabled={loading}>
            <Text>{loading ? "Memproses..." : "Post"}</Text>
          </Pressable>
        </View>
      ) : (
        <Text style={s.muted}>
          <Link href={{ pathname: "/login", params: { from: `/film/${id}/rating` } }} style={{ textDecorationLine: "underline" }}>Login</Link> untuk memberi rating.
        </Text>
      )}
    </ScrollView>
  );
}
