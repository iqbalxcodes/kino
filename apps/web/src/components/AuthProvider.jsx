import { useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import { getUser, login, logout } from "../services/authService";

function AuthProvider({ children }) {
    const [user, setUser] = useState(getUser);

    const value = {
        user,
        signIn: async (email, password) => setUser(await login(email, password)),
        signOut: () => {
            logout();
            setUser(null);
        },
    };

    return <AuthContext value={value}>{children}</AuthContext>;
}

export default AuthProvider;
