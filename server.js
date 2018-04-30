// import your node modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const db = require('./data/db.js');
const { respondWithError, validateBody } = require('./utils');
const {
  DATABASE_RETRIEVAL_ERROR,
  NOT_FOUND_ERROR,
  INPUT_ERROR,
  REMOVE_ERROR,
  PUT_ERROR,
} = require('./Errors');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// add your server code starting here

// get
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.find();
    res.json(posts);
  } catch (error) {
    respondWithError(res, DATABASE_RETRIEVAL_ERROR);
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const post = await db.findById(id);

    if (!post.length) throw NOT_FOUND_ERROR;

    res.json(post);
  } catch (error) {
    switch (error) {
      case NOT_FOUND_ERROR:
        respondWithError(res, error);
        break;
      default:
        respondWithError(res, DATABASE_RETRIEVAL_ERROR);
    }
  }
});

// post
app.post('/api/posts', async (req, res) => {
  const { body } = req;
  try {
    if (!validateBody(body)) throw INPUT_ERROR;
    const response = await db.insert(body);
    res.status(201).json(response);
  } catch (error) {
    switch (error) {
      case INPUT_ERROR:
        respondWithError(res, error);
        break;
      default:
        respondWithError(res, DATABASE_RETRIEVAL_ERROR);
    }
  }
});

// delete
app.delete('/api/posts/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const response = await db.remove(id);
    if (response === 0) throw NOT_FOUND_ERROR;
    res.json(response);
  } catch (error) {
    switch (error) {
      case NOT_FOUND_ERROR:
        respondWithError(res, error);
        break;
      default:
        respondWithError(res, REMOVE_ERROR);
    }
  }
});

// put
app.put('/api/posts/:id', async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    if (!validateBody(body)) throw INPUT_ERROR;
    const response = await db.update(id, body);

    if (Number(response) === 0) throw NOT_FOUND_ERROR;

    const updatedPost = await db.findById(id);

    res.json(updatedPost);
  } catch (error) {
    switch (error) {
      case INPUT_ERROR:
        respondWithError(res, error);
        break;
      case NOT_FOUND_ERROR:
        respondWithError(res, error);
        break;
      default:
        respondWithError(res, PUT_ERROR);
    }
  }
});

app.listen(3000);
