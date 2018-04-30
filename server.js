// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(express.json());

// add new post
server.post('/api/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    throw res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  }

  db
  .insert(req.body)
  .then(posts => {
    res.json(posts);
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
});

// get all posts
server.get('/api/posts', (req, res) => {
  db
  .find()
  .then(posts => {
    res.json(posts);
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
});

// get specific post
server.get('/api/posts/:id', (req, res) => {
  db
  .findById(req.params.id)
  .then(post => {
    res.json(post);
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
});

// delete a post
server.delete('/api/posts/:id', (req, res) => {
  db
    .remove(req.params.id)
    .then(id => {
      res.json(id);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
});

// update post by id
server.put('/api/posts/:id', (req, res) => {
  db
  .update(req.params.id, req.body)
  .then(posts => {
    res.json(posts);
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
});

server.listen(5000, console.log('\n== API Running on port 500 ==\n'));