const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const NOT_FOUND = 404;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  // {
  //   id: 1,
  //   title: 'Going to the country',
  //   contents: 'Going to eat me a lot of peaches'
  // },
  // {
  //   id: 2,
  //   title: '*Moving to the country',
  //   contents: 'it\'s "moving" you idiot, not going'
  // },
  // {
  //   id: 3,
  //   title: 'I hate that song',
  //   contents: 'It\'s so cheesy'
  // },
  /**
   * {
   * title: "The post title",
   * contents: "The post contents"
   * }
   */
];

let idCounter = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  const { term } = req.query;
  // console.log('term: ', term);
  if (term) {
    const searchArray = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.contents.toLowerCase().includes(term.toLowerCase())
      );
    });
    // console.log(searchArray);
    if (searchArray.length < 1) {
      res.status(NOT_FOUND);
      res.json({ error: `${term} was not found` });
    } else {
      res.json(searchArray);
    }
  } else {
    res.json(posts);
  }
  /**
   * - If the client provides the query-string parameter `term`, filter the posts to
   those that have the `term` in their `title` or `contents` (or both), and
   send down those posts in a JSON response.
   */
});

server.post('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Posts must contain BOTH a title and contents' });
  } else {
    idCounter += 1;
    posts.push(
      {
        id: `${idCounter}`,
        title,
        contents,
      }
    );
    res.json(posts);
  }
  /**
   * POST /posts
   *
   *  When the client makes a POST request to /posts
   *
   * - Ensure that the client provides both `title` and `contents` in the request
   *   body. If any of these don't exist, send an object of the form `{ error- "Error
   *   message" }` as a JSON response. Make sure to respond with an appropriate
   *   status code
   * - If all fields are provided, create a new post object. Assign the post a
   *   unique, numeric `id` property that will act as its identifier, and add it to
   *   the posts array. Return the newly created post object, with its assigned `id`,
   *   to the client in a JSON response.
   */
}
);

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  const checkId = () => id === req.params.id;
  // console.log(checkId());
  const index = posts.findIndex(checkId);
  // console.log(index);
  // console.log(title);
  // console.log(contents);
  // console.log(id);
  if (!title || !contents || !id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Posts must contain a title, an id, and contents' });
  } else if (id !== req.body.id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You must update an existing post' });
  } else {
    posts.splice(index, 1, { id, title, contents });
    res.json(posts);
  }
});
/**
 * ### `PUT /posts`
 *  When the client makes a `PUT` request to `/posts`:
 *
 *  - Ensure that the client provides `id`, `title`, and `contents` in the request
 *    body. If any of these don't exist, send an object of the form `{ error: "Error
 *    message" }` as a JSON response. Make sure to respond with an appropriate
 *    status code.
 *
 *  - If the `id` doesn't correspond to a valid post, respond with an error in the
 *    same form as above.
 *
 *  - Modify the post with the given `id`, updating its `title` and `contents`.
 *    Respond with the newly updated post object in a JSON response.
 *
 */

server.delete('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  const checkId = () => id === req.params.id;
  const index = posts.findIndex(checkId);
  console.log('index: ', index, 'id: ', id, 'req.params.id: ', req.params.id);
  posts.splice(index, 1);
  res.json(posts);
});

 module.exports = { posts, server };
