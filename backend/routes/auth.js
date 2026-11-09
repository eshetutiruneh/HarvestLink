const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
const PUBLIC_ROLES = ["farmer", "consumer", "collector", "driver"];

function publicUser(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    location: row.location,
    role: row.role,
    status: row.status,
    createdAt: row.created_at
  };
}

function issueSession(user, res) {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  res.cookie("harvestlink_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/"
  });
}

router.post("/register", async (req, res, next) => {
  try {
    const { fullName, email, phone, location, role, password } = req.body || {};

    if (![fullName, email, phone, location, role, password].every((value) => typeof value === "string" && value.trim())) {
      return res.status(400).json({ error: "Please complete all required fields." });
    }

    if (fullName.trim().length < 3) {
      return res.status(400).json({ error: "Full name must contain at least 3 characters." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: "Enter a valid email address." });
    }

    if (!/^(?:\+251|0)?9\d{8}$/.test(phone.replace(/[\s-]/g, ""))) {
      return res.status(400).json({ error: "Enter a valid Ethiopian phone number." });
    }

    if (!PUBLIC_ROLES.includes(role)) {
      return res.status(400).json({ error: "Choose a valid account type." });
    }

    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({ error: "Password must be at least 8 characters and contain a letter and a number." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const [existing] = await db.execute("SELECT id FROM users WHERE email = ?", [normalizedEmail]);

    if (existing.length) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await db.execute(
      "INSERT INTO users (full_name, email, phone, location, role, password_hash) VALUES (?, ?, ?, ?, ?, ?)",
      [fullName.trim(), normalizedEmail, phone.trim(), location.trim(), role, passwordHash]
    );

    const [rows] = await db.execute(
      "SELECT id, full_name, email, phone, location, role, status, created_at FROM users WHERE id = ?",
      [result.insertId]
    );

    const user = publicUser(rows[0]);
    issueSession(user, res);

    return res.status(201).json({ message: "Account created successfully.", user });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      return res.status(400).json({ error: "Enter your email and password." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const [rows] = await db.execute(
      "SELECT id, full_name, email, phone, location, role, status, password_hash, created_at FROM users WHERE email = ? LIMIT 1",
      [normalizedEmail]
    );

    const row = rows[0];

    if (!row || !(await bcrypt.compare(password, row.password_hash))) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }

    if (row.status !== "active") {
      return res.status(403).json({ error: "This account is not active. Please contact support." });
    }

    const user = publicUser(row);
    issueSession(user, res);

    return res.json({ message: "Signed in successfully.", user });
  } catch (error) {
    return next(error);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, full_name, email, phone, location, role, status, created_at FROM users WHERE id = ? LIMIT 1",
      [req.user.id]
    );

    if (!rows.length || rows[0].status !== "active") {
      res.clearCookie("harvestlink_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
      });
      return res.status(401).json({ error: "Account not found or inactive." });
    }

    return res.json({ user: publicUser(rows[0]) });
  } catch (error) {
    return next(error);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("harvestlink_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });

  return res.json({ message: "Signed out successfully." });
});

module.exports = router;
