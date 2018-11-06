// import your node modules
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./data/db.js');
const port = 8250;

// add your server code starting here
const server = express();
server.use(bodyParser.json());

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
    } else {
        db.insert({ title, contents })
            .then(post => {
                res.status(201).json({ title, contents })
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "There was an error while saving the post to the database"})
            })
    }
})

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved."})
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist"})
            } else {
                res.status(200).json({ post })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved"})
        })
})

server.listen(port, () => console.log(`we are listening on port ${port}...`))