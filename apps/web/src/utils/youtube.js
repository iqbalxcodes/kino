// Ambil ID video dari link watch / youtu.be / embed / shorts / live
export function youtubeId(url) {
    const match = (url || "").match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
    return match ? match[1] : null;
}
