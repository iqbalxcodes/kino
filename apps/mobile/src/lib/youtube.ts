// Ambil ID video dari link watch / youtu.be / embed / shorts / live
export function youtubeId(url?: string | null): string | null {
  const m = (url || "").match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m ? m[1] : null;
}
