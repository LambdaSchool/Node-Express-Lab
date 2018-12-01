// import your node modules
const express = require("express");
const cors = require('cors')
const db = require("./data/db.js");
const PORT = 5555;
// add your server code starting here
const server = express();

server.disable('etag')
server.use(express.json());
server.use(cors())



server.get("/api/posts", (req, res) => {
db.find()
    .then(posts => {
        res
            .status(200)
            .json(posts);
    })
    .catch(err => {
    res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;


db.findById(id)
    .then(post => {
        // res.json(post);
    if (post) {
        res.json(post);
    } else {
        res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    })
    .catch(err => {
    res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.post("/api/posts", (req, res) => {
    const posts= req.body;
    if (posts.title && posts.contents) {
        db.insert(posts)
            .then(response => {

                db.findById(response.id).then(posts => {
                    res.status(201)
                    .json(posts)
                })

            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "There was an error while saving the post to the database" })

            })
    } else {
        res
            .status(400)
            .json({errorMessage: "Please provide title and contents for the post."})
    }
})


server.delete("/api/posts/:id", (req, res) => {
    const { id } = req.params

    db.remove(id)
        .then(count => {
            count ?
                db.find()
                    .then(posts => {
                        res.status(200)
                            .json(posts)
                })
            :
                res.status(404).json({message: "Invalid Id"})

        })
        .catch(err => {
            res
            .status(500)
            .json({error: "Failed to delete the post"})
        })
})


server.put('/api/posts/:id', (req, res) => {
    const posts = req.body
    const { id } = req.params
    if (posts.title && posts.contents) {
        db.update(id, posts)
            .then(count => {
                count ?
                    db.findById(id).then(posts => {
                        res.json(posts)
                    })
                    :
                    res
                        .status(404)
                        .json({ message: "The post with the specified ID does not exist." })
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The post information could not be modified."})
            })

    } else {
        res
        .status(400)
            .json({ errorMessage: "Please provide title and contents for the post."})
    }

})

server.listen(PORT, () => {
console.log(`server is up and running on port ${PORT}`);
});
