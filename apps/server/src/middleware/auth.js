const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { HttpError } = require("./errorHandler");

module.exports = function requireAuth(req, res, next) {
    const header = req.headers.authorization || "";
    try {
        const payload = jwt.verify(header.replace(/^Bearer /, ""), jwtSecret);
        req.user = { id: payload.sub, name: payload.name };
        next();
    } catch {
        next(new HttpError(401, "Silakan login dulu"));
    }
};
