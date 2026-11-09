const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwtSecret } = require("../config");
const { HttpError } = require("../middleware/errorHandler");

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const clean = (v) => (typeof v === "string" ? v.trim() : "");

exports.register = async (req, res) => {
    const name = clean(req.body?.name);
    const email = clean(req.body?.email).toLowerCase();
    const password = req.body?.password;

    const details = {};
    if (name.length < 2 || name.length > 50) details.name = "Nama harus 2-50 karakter";
    if (!EMAIL_RE.test(email)) details.email = "Email tidak valid";
    if (typeof password !== "string" || password.length < 6 || password.length > 72) {
        details.password = "Password harus 6-72 karakter";
    }
    if (Object.keys(details).length) throw new HttpError(400, "Data tidak valid", details);

    try {
        await User.create({ name, email, passwordHash: await bcrypt.hash(password, 10) });
    } catch (err) {
        if (err.code === 11000) throw new HttpError(409, "Email sudah terdaftar", { email: "Email sudah terdaftar" });
        throw err;
    }
    res.status(201).json({ message: "Registrasi berhasil" });
};

exports.login = async (req, res) => {
    const email = clean(req.body?.email).toLowerCase();
    const password = req.body?.password;

    const user = email && typeof password === "string" && (await User.findOne({ email }));
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        throw new HttpError(401, "Email atau password salah");
    }

    const token = jwt.sign({ name: user.name }, jwtSecret, { subject: String(user._id), expiresIn: "7d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
};
