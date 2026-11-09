require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const db = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();
const port = Number(process.env.PORT || 5000);

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters.");
}

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5500",
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    return res.json({ status: "ok", service: "HarvestLink API", database: "connected" });
  } catch (error) {
    return res.status(503).json({ status: "error", service: "HarvestLink API", database: "disconnected" });
  }
});

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many authentication attempts. Please try again later." }
  })
);

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  return res.status(404).json({ error: "API route not found." });
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ error: "An unexpected server error occurred." });
});

app.listen(port, () => {
  console.log(`HarvestLink API running at http://localhost:${port}`);
});
