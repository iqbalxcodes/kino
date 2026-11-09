import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import FormField from "../components/FormField.jsx";
import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import { rateFilm } from "../services/filmService";

function Rating() {
    const { id } = useParams();
    const { user } = useAuth();
    const location = useLocation();
    const { data, error, setData } = useFetch(`/films/${id}/ratings`);

    const [rating, setRating] = useState("");
    const [comments, setComments] = useState("");
    const [formError, setFormError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setFormError("");
        setFieldErrors({});
        setLoading(true);

        try {
            setData(await rateFilm(id, Number(rating), comments));
            setComments("");
        } catch (err) {
            setFormError(err.message);
            setFieldErrors(err.details || {});
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="page-section">
            <nav className="tabs">
                <Link to={`/film/${id}`} className="tab">Back</Link>
                <span className="tab active">Rating</span>
            </nav>

            {error && <p className="alert alert-error" role="alert">{error}</p>}
            {!data && !error && <p className="muted">Memuat...</p>}

            {data?.ratings.map((r) => (
                <article key={r.userId} className="card rating-item">
                    <header>
                        <span>{r.username}</span>
                        <span>{r.rating}/10</span>
                    </header>
                    <p>{r.comments}</p>
                </article>
            ))}

            {user ? (
                <form className="card rating-form" onSubmit={handleSubmit}>
                    {formError && <p className="alert alert-error" role="alert">{formError}</p>}

                    <FormField label="Your Rating here" htmlFor="rating" error={fieldErrors.rating}>
                        <select id="rating" value={rating} onChange={(event) => setRating(event.target.value)} required>
                            <option value="" disabled>Pilih 1-10</option>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </FormField>

                    <FormField label="Komentar" htmlFor="comments" error={fieldErrors.comments}>
                        <textarea id="comments" value={comments} placeholder="type comment here ..." maxLength={1000}
                            onChange={(event) => setComments(event.target.value)} />
                    </FormField>

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? "Memproses..." : "Post"}
                    </button>
                </form>
            ) : (
                <p className="muted">
                    <Link to="/login" state={{ from: location.pathname }}>Login</Link> untuk memberi rating.
                </p>
            )}
        </section>
    );
}

export default Rating;
