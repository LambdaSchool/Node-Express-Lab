const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json()); //This teaches express to parse json information from req.body

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
})

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        if( post.length < 1) {
            res.status(404).json({ error: 'The post with the specified ID does not exist.' })
        }
        else {
            res.status(200).json(post);
        }  
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/api/posts', async (req, res) => {
    const post = req.body;
    if (post.title && post.contents) {
        try {
            const response = await db.insert(post);
            res.status(201).json(response);
        } catch(err) {
            res.status(500).json({
                title: 'Error',
                description: 'There was an error while saving the post to the database',
            });
        }
    } else {
        res.status(422).json({ errorMessage: 'Please provide title and contents for the post.' });
    }
});




server.listen(9000, () => console.log('\n== API on port 9k ==\n'));