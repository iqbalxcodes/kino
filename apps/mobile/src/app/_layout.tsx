import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../lib/auth";
import { c } from "../lib/ui";

// Serial & Music belum ada halamannya -> teks redup
function TabBar() {
  const { user, signOut } = useAuth();
  const item = { fontSize: 17 };
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 18, borderTopWidth: 1, borderColor: c.border }}>
      <Pressable onPress={() => router.navigate("/")}><Text style={item}>Film</Text></Pressable>
      <Text style={[item, { opacity: 0.4 }]}>Serial</Text>
      <Text style={[item, { opacity: 0.4 }]}>Music</Text>
      {user
        ? <Pressable onPress={signOut}><Text style={item}>Logout ({user.name})</Text></Pressable>
        : <Pressable onPress={() => router.navigate("/register")}><Text style={item}>Register</Text></Pressable>}
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <StatusBar style="dark" />
          <Pressable onPress={() => router.navigate("/")} style={{ padding: 24, borderBottomWidth: 1, borderColor: c.border }}>
            <Text style={{ fontSize: 24, fontWeight: "800" }}>KINO</Text>
          </Pressable>
          <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false, animation: "none", contentStyle: { backgroundColor: "#fff" } }} />
          </View>
          <TabBar />
        </SafeAreaView>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
