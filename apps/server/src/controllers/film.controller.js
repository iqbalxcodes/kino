const mongoose = require("mongoose");
const Film = require("../models/Film");
const { HttpError } = require("../middleware/errorHandler");

const LIST_FIELDS = "title ratingOverall ratingCount categories year posterUrl backdropUrl youtubeUrl";

async function findFilm(id, select) {
    const query = mongoose.isValidObjectId(id) ? Film.findById(id) : null;
    const film = query && (await (select ? query.select(select) : query));
    if (!film) throw new HttpError(404, "Film tidak ditemukan");
    return film;
}

// GET /api/films?sort=popular 
exports.list = async (req, res) => {
    const sort = req.query.sort === "popular" ? { ratingCount: -1, ratingOverall: -1 } : { title: 1 };
    // ponytail: tanpa paginasi, limit(0) = semua. Tambah paginasi kalau film sudah ratusan.
    res.json(await Film.find().select(LIST_FIELDS).sort(sort).limit(Number(req.query.limit) || 0));
};

// GET /api/films/:id  
exports.detail = async (req, res) => {
    res.json(await findFilm(req.params.id, "-ratings -__v"));
};

// GET /api/films/:id/ratings
exports.ratings = async (req, res) => {
    const film = await findFilm(req.params.id, "ratings ratingOverall ratingCount");
    res.json({ ratingOverall: film.ratingOverall, ratingCount: film.ratingCount, ratings: film.ratings });
};

// POST /api/films/:id/ratings  (login) body: { rating: 1-10, comments? }
exports.rate = async (req, res) => {
    const rating = req.body?.rating;
    const comments = req.body?.comments ?? "";

    const details = {};
    if (!Number.isInteger(rating) || rating < 1 || rating > 10) details.rating = "Rating harus angka bulat 1-10";
    if (typeof comments !== "string" || comments.length > 1000) details.comments = "Komentar maksimal 1000 karakter";
    if (Object.keys(details).length) throw new HttpError(400, "Data tidak valid", details);

    const film = await findFilm(req.params.id);
    film.applyRating(req.user, rating, comments.trim());
    await film.save();

    res.status(201).json({ ratingOverall: film.ratingOverall, ratingCount: film.ratingCount, ratings: film.ratings });
};
