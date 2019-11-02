// Create express
const express = require('express');

// Route dependencies
const postRouter = require('./Routes/posts');

// Create server
const server = express();

// Middleware for JSON
server.use(express.json());

// Routes
server.use('/api/posts', postRouter);

module.exports = server;
