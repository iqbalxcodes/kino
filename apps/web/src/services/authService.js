import { api } from "./api";

export function register(name, email, password) {
    return api("/auth/register", { method: "POST", body: { name, email, password } });
}

export async function login(email, password) {
    const { token, user } = await api("/auth/login", { method: "POST", body: { email, password } });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem("user") ?? "null");
    } catch {
        return null;
    }
}
