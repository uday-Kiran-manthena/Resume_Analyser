// backend/server.js

// --- NEW: Add this entire debugging block at the top ---
console.log("===================================");
console.log("SERVER STARTING UP...");
console.log(`Node Environment: ${process.env.NODE_ENV}`);
console.log(`Database URL available: ${!!process.env.DATABASE_URL}`);
console.log(`OpenAI Key available: ${!!process.env.OPENAI_API_KEY}`);
console.log("===================================");
// --- End of debugging block ---

const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// This is the safer CORS configuration
const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://resume-analyser-eight.vercel.app/", // Your live Vercel URL
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/resumes", resumeRoutes);

app.listen(PORT, () => {
  // This message will only appear if the server starts successfully
  console.log(`Server successfully started and listening on port ${PORT}`);
});
