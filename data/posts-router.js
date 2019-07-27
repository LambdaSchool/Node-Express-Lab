const express = require('express');
const Posts = require('./db.js');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the posts.' });
  }
});

router.post('/', async (req, res) => {
  const post = { ...req.body };
  try {
    const newPost = await Posts.insert(req.body);
    if (newPost.title && newPost.contents) {
      console.log(req.body, newPost);
      res.status(201).json(post);
    } else {
      res.status(400).json({
        success: false,
        message: 'Please provide title and contents for the post.'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'There was an error while saving the post to the database'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'The post information could not be retrieved.' });
  }
});

module.exports = router;
