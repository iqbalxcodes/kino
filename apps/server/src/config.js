require("dotenv").config();

const { MONGODB_URI, JWT_SECRET, PORT = 4000 } = process.env;

if (!MONGODB_URI || !JWT_SECRET) throw new Error("MONGODB_URI dan JWT_SECRET wajib diisi di .env");

module.exports = { mongoUri: MONGODB_URI, jwtSecret: JWT_SECRET, port: Number(PORT) };