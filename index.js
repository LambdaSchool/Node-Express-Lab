// import your node modules
const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

const db = require('./data/db.js');

const url = '/api/posts/';

server.get(url, (req, res) => {
   db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({message: "can't find post", error: err})
        })
}); // READ data


server.get(`${url}:id`, (req, res) => {
	const { id } = req.params;
	db
	  .findById(id)
	  .then(posts => {
	  	if(posts.length === 0) {
	  		res.status(404).json({error: 'The post with the specified ID does not exist.'});
	  	} else {
	  		res.json(posts);
	  	}
	  })
	  .catch(error => {
	  	res.status(500).json({error: 'The post information could not be retrieved.'});
	  })
});

server.post(url, (req, res) => {
	res.status(201).json({url: url, operation: "POST"})
}); //CREATE

server.put(url, (req, res) => {
	res.status(200).json({url: url, operation: "PUT"})
}); //UPDATA

server.delete(url, (req, res) => {
	res.status(204).json({url: url, operation: "DELETE"})
}); //DESTROY 

server.listen(9000, () => console.log('server is running'))
// add your server code starting here

