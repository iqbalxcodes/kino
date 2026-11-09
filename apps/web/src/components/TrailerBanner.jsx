import { useEffect, useRef, useState } from "react";
import { youtubeId } from "../utils/youtube";

const embed = (id, params) =>
    `https://www.youtube-nocookie.com/embed/${id}?${new URLSearchParams({ rel: 0, playsinline: 1, ...params })}`;

function TrailerModal({ id, title, onClose }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current.open) ref.current.showModal();
    }, []);

    return (
        <dialog ref={ref} className="trailer-modal" onClose={onClose}
            onClick={(event) => event.target === ref.current && ref.current.close()}>
            <button type="button" className="trailer-close" aria-label="Tutup" onClick={() => ref.current.close()}>×</button>
            <iframe src={embed(id, { autoplay: 1 })} title={`Trailer ${title}`} allowFullScreen
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin" />
        </dialog>
    );
}

// Banner: trailer muted autoplay loop (browser hanya mengizinkan autoplay tanpa suara).
// Klik -> popup player dengan suara. Tanpa youtubeUrl -> gambar backdrop saja.
function TrailerBanner({ film, className }) {
    const [open, setOpen] = useState(false);
    const id = youtubeId(film.youtubeUrl);

    
    console.log("TRAILER DEBUG:", {
    title: film.title,
    youtubeUrl: film.youtubeUrl,
    youtubeId: id
});
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
        <div className={className}>
            {id && !reduceMotion
                ? <iframe className="trailer-preview" aria-hidden="true" tabIndex={-1} title={`Preview ${film.title}`}
                    src={embed(id, { autoplay: 1, mute: 1, loop: 1, playlist: id, controls: 0, disablekb: 1 })}
                    allow="autoplay; encrypted-media" referrerPolicy="strict-origin-when-cross-origin" />
                : film.backdropUrl && <img src={film.backdropUrl} alt="" />}

            {id && (
                <>
                    <button type="button" className="trailer-hit" aria-label={`Putar trailer ${film.title}`}
                        onClick={() => setOpen(true)} />
                    {open && <TrailerModal id={id} title={film.title} onClose={() => setOpen(false)} />}
                </>
            )}
        </div>
    );
}

export default TrailerBanner;
