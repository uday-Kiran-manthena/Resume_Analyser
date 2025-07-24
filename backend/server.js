// backend/server.js

const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// --- NEW: CORS Configuration ---
// Create a list of all the domains that are allowed to access your backend
const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://resume-analyser-eight.vercel.app/", //  live Vercel URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests that don't have an origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

// Use the new CORS options in your app
app.use(cors(corsOptions));

// --- The rest of your file remains the same ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/resumes", resumeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
