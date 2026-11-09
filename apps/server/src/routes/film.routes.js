const router = require("express").Router();
const requireAuth = require("../middleware/auth");
const { list, detail, ratings, rate } = require("../controllers/film.controller");

router.get("/", list);
router.get("/:id", detail);
router.get("/:id/ratings", ratings);
router.post("/:id/ratings", requireAuth, rate);

module.exports = router;
