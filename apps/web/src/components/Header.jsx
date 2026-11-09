import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Serial & Music belum ada halamannya -> teks biasa dulu
function Header() {
    const { user, signOut } = useAuth();

    return (
        <header className="site-header">
            <Link to="/" className="brand">KINO</Link>
            <nav>
                <Link to="/">Film</Link>
                <span>Serial</span>
                <span>Music</span>
                {user
                    ? <button type="button" onClick={signOut}>Logout ({user.name})</button>
                    : <Link to="/register">Register</Link>}
            </nav>
        </header>
    );
}

export default Header;
