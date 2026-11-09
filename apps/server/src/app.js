    const express = require("express");
    const cors = require("cors");
    const config = require("./config");
    const { notFound, errorHandler } = require("./middleware/errorHandler");

    const app = express();

    app.use(cors({ origin: config.clientOrigin }));
    app.use(express.json({ limit: "10kb" }));

    app.use("/api/auth", require("./routes/auth.routes"));
    app.use("/api/films", require("./routes/film.routes"));

    app.use(notFound);
    app.use(errorHandler);

    module.exports = app;
