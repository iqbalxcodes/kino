import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "./api";

type User = { id: string; name: string; email: string };
type Auth = { user: User | null; signIn: (email: string, password: string) => Promise<void>; signOut: () => Promise<void> };

const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync("user").then((v) => v && setUser(JSON.parse(v))).catch(() => {});
  }, []);

  const value: Auth = {
    user,
    signIn: async (email, password) => {
      const res = await api<{ token: string; user: User }>("/auth/login", { method: "POST", body: { email, password } });
      await SecureStore.setItemAsync("token", res.token);
      await SecureStore.setItemAsync("user", JSON.stringify(res.user));
      setUser(res.user);
    },
    signOut: async () => {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      setUser(null);
    },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const v = useContext(AuthContext);
  if (!v) throw new Error("useAuth harus di dalam AuthProvider");
  return v;
}
