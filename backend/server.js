require('dotenv').config();

const express = require("express");
const app = express();

const userRoutes = require("./routes/user");
const matRoutes = require("./routes/mat");
const adminRoutes = require("./routes/admin");
const saveRoutes = require("./routes/save");
const { connect } = require("./database/mongodb");

// MIDDLEWARE SETUP
app.use(express.json({ limit: "1mb" }));
// app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// ERROR HANDLING MIDDLEWARE
app.use((error, req, res, next) => {
  // To handle JSON parsing errors
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  
  // Log general errors
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// ROUTES SETUP
app.get("/", (req, res) => {
  res.send("Connected, World!");
});
app.use("/api/user", userRoutes);
app.use("/api/mat", matRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/save", saveRoutes);

// Test database connection
connect()
  .then((db) => {
    // Perform other database-related operations

    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });

  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
});

module.exports = app; // Export the Express app instance