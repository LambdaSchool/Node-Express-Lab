// import your node modules
const express = require('express');
var cors = require('cors')

const server = express();
server.use(cors());
server.use(express.json());

const db = require('./data/db.js');


// add your server code starting here
server.get('/api/posts', (req,res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

server.get('/api/posts/:id', (req,res) => {
    const id = req.params.id;
    db.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } 
            res.status(404).json({message: "The post with the specified ID does not exist."});
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved."})
        })
})

server.post('/api/posts/', async (req, res) => {
    if (req.body.title !== undefined && req.body.contents !== undefined) {
        try {
            const postId = await db.insert(req.body);
            res.status(201).json(postId);
        }
        catch (err) {
            res.status(500).json({error: "There was an error while saving the post to the database"})
        }
    }
    else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
})

server.delete('/api/posts/:id', (req,res) => {
    db.remove(req.params.id).then(count => {
        if (count) {
            res.status(200).json(count);
        }
        else {
            res.status(404).json({message: "The post with the specified ID does not exist."});
        }
    }).catch(err => {
        res.status(500).json({error: "The post could not be removed"});
    })
})

server.listen(9000, () => console.log('live'));