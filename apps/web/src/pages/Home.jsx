import FilmCard from "../components/FilmCard";
import TrailerBanner from "../components/TrailerBanner";
import { useFetch } from "../hooks/useFetch";
import { youtubeId } from "../utils/youtube";

function Home() {
    const { data: films, error } = useFetch("/films?sort=popular");
    
    const hero = films?.find((film) => youtubeId(film.youtubeUrl)) ?? films?.[0];

    return (
        <section className="page-section">
            <h1>Mau nonton apa hari ini?</h1>

            <TrailerBanner film={hero ?? {}} className="hero" />

            <h2>Semua Film</h2>
            {error && <p className="alert alert-error" role="alert">{error}</p>}
            {!films && !error && <p className="muted">Memuat...</p>}
            <div className="film-grid">
                {films?.map((film) => <FilmCard key={film._id} film={film} />)}
            </div>
        </section>
    );
}

export default Home;
