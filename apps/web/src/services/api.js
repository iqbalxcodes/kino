const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export class ApiError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.details = details;
    }
}

export async function api(path, { method = "GET", body } = {}) {
    const token = localStorage.getItem("token");
    const headers = {};
    if (body) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(BASE + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new ApiError(data.message ?? "Terjadi kesalahan", data.details);
    return data;
}
