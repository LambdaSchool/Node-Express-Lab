// import your node modules
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./data/db.js');

const server = express();
server.use(bodyParser.json());

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db
    .findById(id)
    .then(posts => {
      res.json(posts[0]);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  if (!title || !contents) {
    res.status(400);
    res.json({
      errorMessage: 'Please provide title and contents for the post.'
    });
    return;
  }
  db
    .insert(newPost)
    .then(() => {
      res.status(201);
      res.json(newPost);
    })
    .catch(error => {
      res.status(500);
      res.json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

// add your server code starting here
const port = 5010;
server.listen(port, () => console.log('API running on port 5010'));
