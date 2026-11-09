const mongoose = require("mongoose");
const config = require("./config");
const app = require("./app");

mongoose.connect(config.mongoUri).then(() => {
    app.listen(config.port, () => console.log(`Kino server: http://localhost:${config.port}`));
});