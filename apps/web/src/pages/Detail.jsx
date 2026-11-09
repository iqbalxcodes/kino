import { Link, useParams } from "react-router-dom";
import TrailerBanner from "../components/TrailerBanner.jsx";
import { useFetch } from "../hooks/useFetch";
import { formatRating } from "../utils/format";

function Detail() {
    const { id } = useParams();
    const { data: film, error } = useFetch(`/films/${id}`);

    if (error) return <p className="alert alert-error" role="alert">{error}</p>;
    if (!film) return <p className="muted">Memuat...</p>;

    return (
        <section className="page-section">
            <TrailerBanner film={film} className="backdrop" />

            <div className="film-head">
                <div className="film-poster">
                    {film.posterUrl && <img src={film.posterUrl} alt={film.title} />}
                </div>
                <div>
                    <h1>{film.title}</h1>
                    <p>{film.year} | {formatRating(film)} | {film.categories.join(", ")}</p>
                </div>
            </div>

            <nav className="tabs">
                <span className="tab active">Description</span>
                <Link to={`/film/${film._id}/rating`} className="tab">Rating</Link>
            </nav>

            <p>{film.synopsis}</p>
        </section>
    );
}

export default Detail;
