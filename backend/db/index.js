// backend/db/index.js
const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

// Create an empty configuration object that we will build
const connectionConfig = {};

if (isProduction) {
  // If we are in production on Render, we MUST use the DATABASE_URL
  // and we MUST enable SSL. This is the most critical part.
  console.log(
    "Running in PRODUCTION mode. Configuring with DATABASE_URL and SSL."
  );
  connectionConfig.connectionString = process.env.DATABASE_URL;
  connectionConfig.ssl = {
    rejectUnauthorized: false,
  };
} else {
  // If we are running locally, use the individual variables from the .env file.
  console.log("Running in DEVELOPMENT mode. Using local .env configuration.");
  connectionConfig.user = process.env.DB_USER;
  connectionConfig.host = process.env.DB_HOST;
  connectionConfig.database = process.env.DB_DATABASE;
  connectionConfig.password = process.env.DB_PASSWORD;
  connectionConfig.port = process.env.DB_PORT;
}

// Create the database pool with the correct configuration
const pool = new Pool(connectionConfig);

console.log("Database pool created successfully.");

module.exports = {
  query: (text, params) => pool.query(text, params),
};
