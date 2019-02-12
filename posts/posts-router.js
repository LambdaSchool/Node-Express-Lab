const express = require('express');

const db = require('../data/db');

const router = express.Router();

//GET

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json({ success: true, posts });
    })
    .catch(error => {
      res.status(500).json({ success: false, error: "The posts information could not be retrieved"})
    })
});

router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post) {
        return res.status(200).json({ success: true, post })
      } else {
        res.status(404).json({ success: false, error: "The post with the specified ID does not exist."})
      }
    })
    .catch(error => {
      res.status(500).json({ success: false, error: "The post information could not be retrieved."})
    })
});

//POSTS

router.post('/', async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ success: false, error: "Please provide title and contents for the post."})
  }
  try {
    const post = await db.insert(req.body);
    res.status(201).json({ success: true, post})
  } catch (error) {
    res.status(500).json({ success: false, error: "There was an error while saving the post."})
  }
});


// DELETE

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.remove(req.params.id);
    if (deleted) {
      return res.status(200).json({ success: true, deleted})
    } else {
      res.status(404).json({ success: false, error: "The post with the specified ID does not exist"})
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "The post could not be removed"})
  }
});


//EDIT

router.put('/:id', async (req, res) => {

  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ success: false, error: "Please provide title and contents for post"})
  }
  try {
    const edited = await db.update(req.params.id, req.body);
    if (edited) {
      return res.status(200).json({ success: true, edited })
    } else {
      res.status(404).json({ success: false, error: "The post with the specified ID does not exist"})
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "The post information could not be modified"})
  }

});







module.exports = router;