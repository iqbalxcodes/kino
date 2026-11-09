import { api } from "./api";

export function rateFilm(id, rating, comments) {
    return api(`/films/${id}/ratings`, { method: "POST", body: { rating, comments } });
}
