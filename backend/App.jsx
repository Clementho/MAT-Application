const express = require('express');
const app = express();

// Other imports and configurations

// Routes
const authRoutes = require('./Routes/auth');

// Middleware
app.use(express.json());

// Mounting routes
app.use('/api/auth', authRoutes);

// Other app configurations and middleware

module.exports = app;
