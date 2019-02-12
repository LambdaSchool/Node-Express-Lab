const express = require('express');

const Posts = require('../data/db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'You done goofed',
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found '});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the post',
        });
    }
});

// router.post('/', async (req, res) => {
//     try {
//         const post = await Posts.insert(req.body);
//         res.status(201).json(post);
//     } catch(error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'Error while saving the post to the database',
//         });
//     }
// });

router.post('/', (req, res) => {
    const post = req.body;
    if (!post.title || !post.contents){
        res.status(400).json({ message: "Please add title and contents to the post"});
    }
    Posts
        .insert(post)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error while saving the post to the databse"});
        });
})

router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if (count > 0){
            res.status(200).json({ message: 'This post is goneso!'});
        } else {
            res.status(404).json({ message: 'This post does not exist to be deleted' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Error removing the post',
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.update(req.params.id, req.body);
        if (post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post could not be found'});
        }
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error updating the post',})
    }
});

module.exports = router;