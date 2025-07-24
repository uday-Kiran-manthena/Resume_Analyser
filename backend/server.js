// backend/server.js

const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// --- FINAL, CORRECTED CORS Configuration ---

// 1. Define your whitelist of allowed domains.
const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://resume-analyser-eight.vercel.app", // Your live Vercel URL
];

// 2. This is the standard and most reliable way to configure CORS.
// It will correctly handle all requests, including the preflight OPTIONS requests.
app.use(
  cors({
    origin: allowedOrigins,
  })
);

// --- The rest of your file remains the same ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/resumes", resumeRoutes);

app.listen(PORT, () => {
  console.log(`Server successfully started and listening on port ${PORT}`);
});
