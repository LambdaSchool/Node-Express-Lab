// import your node modules
const express = require('express');

// add your server code starting here

const server = express();

const db = require('./data/db.js');

// JSON body parser

server.use(express.json());

// GET for localhost running

server.get('/', (req, res) => {
    res.send('API running');    
})

// GET for entire array

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    });
});

// GET for individual post

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db
    .findById(id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "Not found" })
        } else {
            res.json(post);
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post with the specified ID does not exist." })
    });
});

// POST new posts to database

server.post('/api/posts', (req, res) => {
    const post = req.body;

    db
    .insert(post)
    .then(post => {
        if (req.body) {
            res.status(201)
        }
        res.json(post);
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    })
})

server.listen(3000);