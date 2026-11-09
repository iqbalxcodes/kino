import { Link, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import TrailerBanner from "../../../components/TrailerBanner";
import { Film, formatRating, useFetch } from "../../../lib/api";
import { c, s } from "../../../lib/ui";

export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: film, error } = useFetch<Film>(`/films/${id}`);

  if (error) return <Text style={{ margin: 24, color: c.danger }}>{error}</Text>;
  if (!film) return <Text style={[s.muted, { margin: 24 }]}>Memuat...</Text>;

  const meta = { fontWeight: "700", fontSize: 16 } as const;
  return (
    <ScrollView contentContainerStyle={{ padding: 24 }}>
      <TrailerBanner film={film} />

      {/* poster numpuk ke atas backdrop, teks di bawahnya */}
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 20, marginTop: -70, paddingHorizontal: 8 }}>
        <View style={{ width: 140, aspectRatio: 2 / 3, overflow: "hidden", backgroundColor: "#fff", borderWidth: 1, borderColor: c.border, borderRadius: 20 }}>
          {film.posterUrl && <Image source={{ uri: film.posterUrl }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 28, fontWeight: "800", marginBottom: 8 }}>{film.title}</Text>
          <Text style={meta}>{formatRating(film)}</Text>
          <Text style={meta}>{film.categories.join(", ")}</Text>
          <Text style={meta}>{film.year}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 32, marginVertical: 24 }}>
        <Text style={{ fontWeight: "700", fontSize: 16, borderBottomWidth: 2 }}>Description</Text>
        <Link href={`/film/${film._id}/rating`} style={{ fontSize: 16 }}>Rating</Link>
      </View>

      <Text style={{ lineHeight: 24, fontSize: 16 }}>{film.synopsis}</Text>
    </ScrollView>
  );
}
