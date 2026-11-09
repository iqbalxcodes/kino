import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

// HP fisik: pakai IP LAN laptop (EXPO_PUBLIC_API_URL di .env). Emulator Android: http://10.0.2.2:4000/api
const BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000/api";

export type Film = {
  _id: string; title: string; ratingOverall: number; ratingCount: number; categories: string[];
  year?: number; posterUrl?: string; backdropUrl?: string; youtubeUrl?: string; synopsis?: string;
};
export type Rating = { userId: string; username: string; rating: number; comments: string };
export type RatingsData = { ratingOverall: number; ratingCount: number; ratings: Rating[] };

export const formatRating = (f: Pick<Film, "ratingCount" | "ratingOverall">) => (f.ratingCount ? f.ratingOverall.toFixed(1) : "-");

export class ApiError extends Error {
  details: Record<string, string>;
  constructor(message: string, details: Record<string, string> = {}) {
    super(message);
    this.details = details;
  }
}

export async function api<T>(path: string, { method = "GET", body }: { method?: string; body?: unknown } = {}): Promise<T> {
  const token = await SecureStore.getItemAsync("token").catch(() => null);
  const headers: Record<string, string> = {};
  if (body) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.message ?? "Terjadi kesalahan", data.details);
  return data;
}

// state ikut path, jadi ganti path tidak menampilkan data lama
export function useFetch<T>(path: string) {
  const [state, setState] = useState<{ path: string; data?: T; error?: string }>({ path });

  useEffect(() => {
    let stale = false;
    api<T>(path)
      .then((data) => !stale && setState({ path, data }))
      .catch((e: Error) => !stale && setState({ path, error: e.message }));
    return () => {
      stale = true;
    };
  }, [path]);

  const cur = state.path === path ? state : undefined;
  return { data: cur?.data, error: cur?.error, setData: (data: T) => setState({ path, data }) };
}
