import { StyleSheet } from "react-native";

export const c = {
  text: "#111",
  muted: "#666",
  border: "#d6d6d6",
  gray: "#d9d9d9",
  green: "#16a34a",
  white: "#ffffff",
  danger: "#8a1f17",
  dangerBg: "#fdecea",
  dangerBorder: "#e5a5a0"
};

export const s = StyleSheet.create({
  h1: { fontSize: 24, fontWeight: "700" },
  h2: { fontSize: 20, fontWeight: "700" },
  muted: { color: c.muted },
  card: { padding: 24, borderWidth: 1, borderColor: c.border, borderRadius: 20, backgroundColor: "#fff" },
  input: { padding: 12, fontSize: 16, borderWidth: 1, borderColor: c.border, borderRadius: 10 },
  btn: { padding: 12, alignItems: "center", backgroundColor: c.gray, borderRadius: 10 },
  alert: { padding: 12, marginBottom: 14, borderWidth: 1, borderRadius: 10 },
  error: { backgroundColor: c.dangerBg, borderColor: c.dangerBorder },
  success: { backgroundColor: c.gray, borderColor: c.text },
});
