// import your node modules
const express = require('express');
const server = express();
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const cors = require('cors');

const db = require('./data/db.js');

server.use(cors());
server.use(express.json());

// quick text display to make sure everything loads properly

// general get statements
server.get('/', (req, res) => {
  console.log('test');
  res.send('Testing server.');
});

server.get('/posts', (req, res) => {
  db.find().then(posts => {
    console.log('\n** posts **', posts);
    res.json(posts);
  })
  .catch(err => res.send(err));
});

// create a new post

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  db.insert(newPost)
    .then(id => {
      db.findById(id)
        .then(post => {
          res.status(201).json(post);
        });
    })
    .catch(err => console.error(err));
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedPost => {
      console.log(removedPost);
      res.status(200).json(removedPost);
    })
    .catch(err => console.error(err));
});






// find a specific post by id

server.get('/posts/:id', (req, res) => {
  db.findById(id.id)
    .then
})
// listen on port 8000

server.listen(8000, () => console.log('Server listening on port 8000.'));
