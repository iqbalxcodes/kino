import { useState } from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { Film } from "../lib/api";
import { c } from "../lib/ui";
import { youtubeId } from "../lib/youtube";

// cover=true: iframe 16:9 di-center & dipotong supaya menutupi kotak (efek object-fit: cover)
const page = (id: string, params: string, cover: boolean) => `<!doctype html>
<meta name="viewport" content="width=device-width,initial-scale=1">
<body style="margin:0;background:#000;overflow:hidden">
<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&${params}"
  allow="autoplay; encrypted-media; fullscreen" allowfullscreen
  style="border:0;position:absolute;${cover
    ? "top:50%;left:50%;transform:translate(-50%,-50%);width:177.78vh;min-width:100%;height:56.25vw;min-height:100%"
    : "inset:0;width:100%;height:100%"}"></iframe>`;

function Player({ id, params, cover }: { id: string; params: string; cover: boolean }) {
  return (
    <WebView
      style={{ flex: 1, backgroundColor: "#000" }}
      source={{ html: page(id, params, cover), baseUrl: "https://www.youtube-nocookie.com" }}
      originWhitelist={["*"]}
      javaScriptEnabled
      allowsInlineMediaPlayback
      allowsFullscreenVideo
      mediaPlaybackRequiresUserAction={false}
      scrollEnabled={false}
    />
  );
}

// Banner: trailer muted autoplay loop. Tap -> modal player dengan suara.
// Tanpa youtubeUrl -> gambar backdrop saja.
export default function TrailerBanner({ film, ratio = 16 / 10 }: { film?: Film; ratio?: number }) {
  const [open, setOpen] = useState(false);
  const id = youtubeId(film?.youtubeUrl);

  return (
    <View style={{ aspectRatio: ratio, overflow: "hidden", backgroundColor: c.gray, borderRadius: 20 }}>
      {id
        ? <View style={{ flex: 1 }} pointerEvents="none">
            <Player id={id} cover params={`autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&disablekb=1`} />
          </View>
        : film?.backdropUrl && <Image source={{ uri: film.backdropUrl }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />}

      {id && (
        <>
          <Pressable style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} onPress={() => setOpen(true)}
            accessibilityLabel={`Putar trailer ${film?.title}`}>
            <Text style={{ position: "absolute", right: 12, bottom: 12, paddingVertical: 6, paddingHorizontal: 14, overflow: "hidden",
              color: "#fff", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 999, fontSize: 13 }}>▶ Watch</Text>
          </Pressable>
          <Modal visible={open} animationType="fade" transparent onRequestClose={() => setOpen(false)}>
            <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.85)" }}>
              <Pressable onPress={() => setOpen(false)} style={{ alignSelf: "flex-end", padding: 16 }} accessibilityLabel="Tutup">
                <Text style={{ color: "#fff", fontSize: 28 }}>×</Text>
              </Pressable>
              <View style={{ aspectRatio: 16 / 9 }}>
                <Player id={id} cover={false} params="autoplay=1" />
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}
