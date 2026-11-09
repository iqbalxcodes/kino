import { FlatList, Text } from "react-native";
import FilmCard from "../components/FilmCard";
import TrailerBanner from "../components/TrailerBanner";
import { Film, useFetch } from "../lib/api";
import { s } from "../lib/ui";
import { youtubeId } from "../lib/youtube";

export default function Home() {
  const { data: films, error } = useFetch<Film[]>("/films?sort=popular");
  const hero = films?.find((f) => youtubeId(f.youtubeUrl)) ?? films?.[0];

  return (
    <FlatList
      data={films}
      numColumns={2}
      keyExtractor={(f) => f._id}
      renderItem={({ item }) => <FilmCard film={item} />}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{ padding: 24, gap: 16 }}
      ListHeaderComponent={
        <>
          <Text style={[s.h1, { marginBottom: 20 }]}>Mau nonton apa hari ini?</Text>
          <TrailerBanner film={hero} />
          <Text style={[s.h2, { marginTop: 28 }]}>Semua Film</Text>
        </>
      }
      ListEmptyComponent={<Text style={s.muted}>{error ?? (films ? "Belum ada film." : "Memuat...")}</Text>}
    />
  );
}
