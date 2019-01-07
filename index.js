// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.listen(8000, () => console.log('Server running, listening on port 8000'))