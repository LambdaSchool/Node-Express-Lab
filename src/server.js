const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');

const request = require('request');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
    { id: 1, title: 'Post1', contents: 'contents Post1' },
    { id: 2, title: 'Post2', contents: 'contents Post2' },
    { id: 3, title: 'Post3', contents: 'contents Post3' },
    { id: 4, title: 'Post4', contents: 'contents Post4' },
    { id: 5, title: 'Post5', contents: 'contents Post5' },
    { id: 6, title: 'Post6', contents: 'contents Post6' },
    { id: 7, title: 'Post7', contents: 'contents Post7' },
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
    if (posts.length === 0) {
        res.status(200).json([]);
        return;
    }
    const term = req.query.term;
    if (term) {
        const filtered = posts.filter((post) => {
            return post.title.includes(term) || post.contents.includes(term);
        });
        res.status(200).json(filtered);
    } 
    else {
        res.status(200).json(posts);
    }
});

server.post('/posts', (req, res) => {
    const newPost = req.body;
    if (newPost.title && newPost.contents) {
        newPost.id = posts.length;
        posts.push(newPost);
        res.status(200).json(newPost);
    } 
    else {
        res.status(STATUS_USER_ERROR).json({ error: 'Title and/or contents missing' });
    }
});

server.put('/posts', (req, res) => {
    const newPost = req.body;
    if (newPost.title && newPost.contents && newPost.id) {
        const index = posts.findIndex((post) => {
            return post.id === newPost.id;
        });
        if (index === -1) {
            res.status(STATUS_USER_ERROR).json({ error: 'ID invalid' });
            return;
        }
        posts.splice(index, 1, newPost);
        res.status(200).json(newPost);
    }
    else {
        res.status(STATUS_USER_ERROR).json({ error: 'Something is missing' });
    }
});

+server.delete('/posts', function(req, res) {
    const index = posts.findIndex(item => item.id === req.body.id);
    if (index !== -1) {
        posts.splice(index, 1);
        res.status(200).json({ success: true });
    } 
    else {
        res.status(400).json({ error: "Something is broken.." });
    }
})



+server.get('/posts', function(req, res) {
    if (req.query.q !== '') {
        const results = posts.filter(post => post.title.includes(req.query.q))
        res.status(200).json(results);
    }
    res.status(200).json(posts);
});




module.exports = { posts, server };