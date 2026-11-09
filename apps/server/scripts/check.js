// Cek hitungan rating tanpa DB: npm run check
const assert = require("node:assert");
const mongoose = require("mongoose");
const Film = require("../src/models/Film");

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);
const user = { id: new mongoose.Types.ObjectId().toString(), name: "Budi" };
const film = new Film({ title: "X", ratingOverall: 8, ratingCount: 2 });

film.applyRating(user, 10, "mantap");
near(film.ratingOverall, 26 / 3);
assert.strictEqual(film.ratingCount, 3);

film.applyRating(user, 4, "revisi"); // user sama = update, count tetap
near(film.ratingOverall, 20 / 3);
assert.strictEqual(film.ratingCount, 3);
assert.strictEqual(film.ratings.length, 1);
assert.strictEqual(film.ratings[0].comments, "revisi");

console.log("ok");
