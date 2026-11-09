class HttpError extends Error {
    constructor(status, message, details) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

function notFound(req, res) {
    res.status(404).json({ message: "Endpoint tidak ditemukan" });
}

function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    if (status === 500) console.error(err);
    res.status(status).json({
        message: status === 500 ? "Terjadi kesalahan pada server" : err.message,
        details: err.details,
    });
}

module.exports = { HttpError, notFound, errorHandler };
