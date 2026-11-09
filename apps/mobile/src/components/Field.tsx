import { Text, TextInput, TextInputProps, View } from "react-native";
import { c, s } from "../lib/ui";

export function Field({ label, error, hint, ...input }: TextInputProps & { label: string; error?: string; hint?: string }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontWeight: "600", marginBottom: 6 }}>{label}</Text>
      <TextInput style={s.input} {...input} />
      {error ? <Text style={{ fontSize: 12, marginTop: 4, color: c.danger }}>{error}</Text>
        : hint ? <Text style={{ fontSize: 12, marginTop: 4, color: c.muted }}>{hint}</Text> : null}
    </View>
  );
}

export function Banner({ kind, children }: { kind: "error" | "success"; children: string }) {
  return (
    <View style={[s.alert, s[kind]]}>
      <Text style={kind === "error" ? { color: c.danger } : undefined}>{children}</Text>
    </View>
  );
}
