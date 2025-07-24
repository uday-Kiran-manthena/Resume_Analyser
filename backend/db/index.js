// backend/db/index.js
const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

// --- This is the key change ---
// We create a base configuration object
const connectionConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// If we are in production on Render, we override the config with the DATABASE_URL
// and add the required SSL setting. This is the most reliable way.
if (isProduction) {
  connectionConfig.connectionString = process.env.DATABASE_URL;
  connectionConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(connectionConfig);

console.log("Database pool created. Production mode:", isProduction);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
