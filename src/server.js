const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

let uniqueID = 0;
// let postArr = [{title: "test1", contents: "ahh blah"}, {title: "test5", contents: "blah blah"}, {title: "test10", contents: "test1 blah"}];


server.get('/posts', (req, res) => {
  const term = req.query.term
  // let indexArr = [];
  const filteredPosts = posts.filter((post) => {
    if (post.title === term) {
      return true;
    } else {
      let contentSwitch = false;
      post.contents.split(' ').forEach((contentWord) => {
        if (contentWord === term) {
          console.log('its true');
          contentSwitch = true;
        }
      });
      return contentSwitch;
    }
  });

  if (filteredPosts.length === 0) {
    res.status(STATUS_SUCCESS);
    res.send(posts);
  } else {
    res.status(STATUS_SUCCESS);
    res.send(filteredPosts);
  }
});

server.post('/posts', (req, res) => {
  const {
    title,
    contents
  } = req.body;
  if (title.length !== 0 && contents.length !== 0) {
    const newPostObj = {
      title,
      contents,
      uniqueID
    };
    posts.push(newPostObj);
    ++uniqueID;
    res.status(STATUS_SUCCESS);
    res.send('theyre defined');
  } else {
    res.status(STATUS_USER_ERROR);
    res.send('not defined');
  }
});

server.put('/posts', (req, res) => {
  const {
    title,
    contents,
    postID
  } = req.body;

  let indexHolder = null;

  posts.forEach((post, index) => {
    if (post.uniqueID === postID) {
      indexHolder = index;
    }
  });

  if (title === '' || contents === '' || postID === '') {
    res.status(STATUS_USER_ERROR).json({ error: 'Must provide id, title, and contents' });
  } else if (indexHolder !== null) {
    const updatePost = {
      uniqueID: postID,
      title,
      contents
    };
    posts[indexHolder] = updatePost;
    res.status(STATUS_SUCCESS).json(updatePost);
  }
});

server.delete('/posts', (req, res) => {
  const {
    postID
  } = req.body;

  const getID = posts.map((post) => {
    return post.uniqeID;
  });

  if (postID === '') {
    res.status(STATUS_USER_ERROR).json({ error: 'Must provide an ID' });
  } else {
    const index = getID.indexOf(Number(postID));

    posts.splice(index, 1);
    res.status(STATUS_SUCCESS).json({ success: true });
  }
});

module.exports = { posts, server };
