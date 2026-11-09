import { Link } from "react-router-dom";
import { formatRating } from "../utils/format";

function FilmCard({ film }) {
    return (
        <Link to={`/film/${film._id}`} className="film-card">
            <div className="film-card-poster">
                {film.posterUrl && <img src={film.posterUrl} alt={film.title} />}
            </div>
            <div className="film-card-body">
                <h3>{film.title}</h3>
                <p>IMDb {formatRating(film)}</p>
                <p className="film-card-meta">
                    <span>{film.categories.join(", ")}</span>
                    <span>{film.year}</span>
                </p>
            </div>
        </Link>
    );
}

export default FilmCard;
