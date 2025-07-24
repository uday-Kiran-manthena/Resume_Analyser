const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// API Routes
app.use("/api/resumes", resumeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

