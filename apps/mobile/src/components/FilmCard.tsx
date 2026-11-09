import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { Film, formatRating } from "../lib/api";
import { c } from "../lib/ui";

export default function FilmCard({ film }: { film: Film }) {
  return (
    <Pressable onPress={() => router.push(`/film/${film._id}`)}
      style={{ width: "48%", overflow: "hidden", backgroundColor: "#fff", borderWidth: 1, borderColor: c.border, borderRadius: 20 }}>
      <View style={{ aspectRatio: 2 / 3, backgroundColor: c.gray }}>
        {film.posterUrl && <Image source={{ uri: film.posterUrl }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />}
      </View>
      <View style={{ padding: 10 }}>
        <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: "500", marginBottom: 4 }}>{film.title}</Text>
        <Text style={{ fontSize: 12 }}>IMDb {formatRating(film)}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8, marginTop: 2 }}>
          <Text numberOfLines={1} style={{ flex: 1, fontSize: 12 }}>{film.categories.join(", ")}</Text>
          <Text style={{ fontSize: 12 }}>{film.year}</Text>
        </View>
      </View>
    </Pressable>
  );
}
