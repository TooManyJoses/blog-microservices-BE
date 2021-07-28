const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());

// since this is a small porject o play around with
// microservices not going to set up a db and jut store info locally
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id, title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
