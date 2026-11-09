const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        username: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 10 },
        comments: { type: String, default: "" },
    },
    { _id: false }
);

const filmSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ratingOverall: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    ratings: [ratingSchema],
    categories: [String],
    year: Number,
    posterUrl: String,
    backdropUrl: String,
    youtubeUrl: String,
    synopsis: String,
});

filmSchema.methods.applyRating = function (user, rating, comments) {
    const old = this.ratings.find((r) => r.userId.equals(user.id));
    if (old) {
        this.ratingOverall += (rating - old.rating) / this.ratingCount;
        old.set({ rating, comments });
    } else {
        this.ratingOverall = (this.ratingOverall * this.ratingCount + rating) / (this.ratingCount + 1);
        this.ratingCount += 1;
        this.ratings.push({ userId: user.id, username: user.name, rating, comments });
    }
};

module.exports = mongoose.model("Film", filmSchema);
